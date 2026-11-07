export type ProductCategory =
  | 'LED lighting'
  | 'Energy meters'
  | 'ABT & multifunction'
  | 'Current transformers';

export interface Product {
  id: string;
  category: ProductCategory;
  name: string;
  subtitle: string;
  desc: string;
  image: string;
  tags: string[];
  specs: Record<string, string>;
  brand?: string;
  wattage?: string;
  voltage?: string;
  phase?: string;
  hsnCode?: string;
  standard?: string;
}

export interface BoqItem {
  product: Product;
  quantity: number;
  selectedWattageOrRating?: string;
  projectNote?: string;
}

export interface EnergyCalcState {
  fixtureType: 'hpsv150' | 'hpsv250' | 'mh400' | 'tube72' | 'custom';
  existingWattage: number;
  ledWattage: number;
  quantity: number;
  hoursPerDay: number;
  tariffPerKwh: number;
}
