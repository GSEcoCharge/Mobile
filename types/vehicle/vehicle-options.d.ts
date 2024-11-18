export interface VehicleOptions {
  brands: string[];
  models: Record<string, { name: string; battery_capacity: number; autonomy: number }[]>;
}
