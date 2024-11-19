import json
import os

file_path = os.path.join(os.path.dirname(__file__), "ev_stations.json")

with open(file_path, "r", encoding="utf-8") as file:
    json_data = file.read()

item_dict = json.loads(json_data)
print(len(item_dict["places"]))
