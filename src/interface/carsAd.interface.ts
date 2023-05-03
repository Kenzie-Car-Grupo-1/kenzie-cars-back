import { CarImage } from "../entities/carImages.entity";

export interface ICarsAdCreate {
  brand: string;
  model: string;
  year: string;
  fuelType: string;
  kms: number;
  color: string;
  price: string;
  description: string;
  images: CarImage[];
}

export interface CarAdRequestParams {
  carId: string;
}

export interface ICarsAdUpdate {
  brand?: string;
  model?: string;
  year?: string;
  fuelType?: string;
  kms?: number;
  color?: string;
  price?: string;
  description?: string;
  images?: string[];
}
