interface EVStation {
  formattedAddress: string;
  location: {
    latitude: number;
    longitude: number;
  };
  displayName: {
    text: string;
    languageCode: string;
  };
  evChargeOptions?: {
    connectorCount: number;
    connectorAggregation: T<{
      type: string;
      count: number;
      maxChargeRateKw?: number;
      availableCount?: number;
      outOfServiceCount?: number;
      availabilityLastUpdateTime?: string;
    }>;
  };
}
