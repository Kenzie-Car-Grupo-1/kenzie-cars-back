import { SrvRecord } from "dns";
import AppDataSource from "../data-source";
import { CarAd } from "../entities/cars.entity";
import {
  ICarsAdCreate,
  ICarsAdUpdate,
  CarAdRequestParams,
} from "../interface/carsAd.interface";
import { CreateCarsAdSerializer } from "../serializers/carsAd.serializers";

export class CarsServices {
  static async create(data: ICarsAdCreate) {
    const carsRepository = AppDataSource.getRepository(CarAd);

    const cars: any = carsRepository.create(data);
    await carsRepository.save(cars);

    const carsAd: ICarsAdCreate = await CreateCarsAdSerializer.validate(cars);

    return carsAd;
  }

  static async listAll() {
    const carsRepository = AppDataSource.getRepository(CarAd);

    const cars = await carsRepository.find();

    return cars;
  }

  static async listOne(carId: any) {
    const carsRepository = AppDataSource.getRepository(CarAd);

    const carsAd = await carsRepository.findOneBy({ id: carId });

    return carsAd;
  }

  static async update(data: ICarsAdUpdate, carId: any) {
    const carsRepository = AppDataSource.getRepository(CarAd);

    const carsAd = await carsRepository.findOneBy({ id: carId });

    const carsAdUpdate: any = carsRepository.create({
      ...carsAd,
      ...data,
    });

    await carsRepository.save(carsAdUpdate);

    return carsAdUpdate;
  }

  static async delete(carId: any) {
    const carsRepository = AppDataSource.getRepository(CarAd);

    const deletedCarAd = await carsRepository.delete({ id: carId });

    return deletedCarAd;
  }
}
