import requests
import json
import os
from dotenv import find_dotenv, load_dotenv


load_dotenv(find_dotenv())


latitude = -23.530171395160448
longitude = -46.57749941703204
radius = 2000
api_key = os.getenv("EXPO_PUBLIC_GOOGLE_PLACES_API_KEY")


url = "https://places.googleapis.com/v1/places:searchNearby"


headers = {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": api_key,
    "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.location,places.evChargeOptions",
}

request_data = {
    "locationRestriction": {
        "circle": {
            "center": {"latitude": latitude, "longitude": longitude},
            "radius": radius,
        }
    },
    "includedTypes": ["electric_vehicle_charging_station"],
    "languageCode": "pt-BR",
    "rankPreference": "DISTANCE",
}


def fetch_ev_stations():
    try:
        response = requests.post(url, headers=headers, json=request_data)
        response.raise_for_status()
        response_data = response.json()

        file_path = os.path.join(os.path.dirname(__file__), "ev_stations.json")

        with open(file_path, "w", encoding="utf-8") as file:
            json.dump(response_data, file, ensure_ascii=False, indent=4)

        print(f"EV stations data saved to: {file_path}")
    except requests.exceptions.RequestException as e:
        print(f"Error fetching EV stations: {e}")


fetch_ev_stations()
