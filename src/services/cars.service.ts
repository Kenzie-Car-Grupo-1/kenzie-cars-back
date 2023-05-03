import AppDataSource from "../data-source";
import { CarAd } from "../entities/cars.entity";
import { ICarsAdCreate, ICarsAdUpdate } from "../interface/carsAd.interface";
import { paginate } from "../utils/pagination.util";
import { CarImage } from "../entities/carImages.entity";
import { Users } from "../entities/user.entity";

export class CarsServices {
  static async create(data: ICarsAdCreate, userId: string) {
    const carsRepository = AppDataSource.getRepository(CarAd);
    const carImagesRepository = AppDataSource.getRepository(CarImage);
    const userRepository = AppDataSource.getRepository(Users);

    const userSaleman = await userRepository.findOne({ where: { id: userId } });

    let { images, ...dataCar }: any = data;

    dataCar.user = userSaleman;

    const cars: any = carsRepository.create(dataCar);
    await carsRepository.save(cars);

    if (images) {
      for await (const image of images) {
        const objImg: any = {
          url: image,
          car: cars,
        };
        const img = carImagesRepository.create(objImg);
        await carImagesRepository.save(img);
      }
    }

    const carsAd: any = await carsRepository.findOne({
      where: { id: cars.id },
      relations: { images: true, user: true, comment: true },
    });

    delete carsAd.user.password;

    return carsAd;
  }

  static async listAll(query: object) {
    const carsRepository = AppDataSource.getRepository(CarAd);

    const cars = await carsRepository.find({
      relations: { images: true, user: true, comment: true },
    });

    return {
      message: "Carros listados com sucesso",
      ...paginate({
        list: cars.reverse(),
        query,
      }),
    };
  }

  static async listOne(carId: any) {
    const carsRepository = AppDataSource.getRepository(CarAd);

    const carsAd: any = await carsRepository.findOne({
      where: { id: carId },
      relations: { images: true, user: true, comment: true },
    });

    delete carsAd.user.password;

    return carsAd;
  }

  static async update(data: ICarsAdUpdate, carId: any) {
    const carsRepository = AppDataSource.getRepository(CarAd);
    const carImagesRepository = AppDataSource.getRepository(CarImage);

    const carsAd: any = await carsRepository.findOne({
      where: { id: carId },
      relations: { images: true, user: true, comment: true },
    });

    if (carsAd.images) {
      for await (const image of carsAd.images) {
        console.log(image);
        await carImagesRepository.delete({ id: image.id });
      }
    }

    const carsAdUpdate: any = carsRepository.create({
      ...carsAd,
      ...data,
    });

    await carsRepository.save(carsAdUpdate);

    if (data.images) {
      for await (const image of data.images!) {
        const objImg: any = {
          url: image,
          car: carsAdUpdate,
        };
        const img = carImagesRepository.create(objImg);

        await carImagesRepository.save(img);
        console.log(img);
      }
    }
    const carUpdated: any = await carsRepository.findOne({
      where: { id: carsAdUpdate.id },
      relations: { images: true, user: true, comment: true },
    });

    delete carUpdated.user.password;

    return carUpdated;
  }

  static async delete(carId: any) {
    const carsRepository = AppDataSource.getRepository(CarAd);

    const deletedCarAd = await carsRepository.delete({ id: carId });

    return deletedCarAd;
  }
}
