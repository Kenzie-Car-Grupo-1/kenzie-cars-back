import AppDataSource from "../data-source";
import { CarAd } from "../entities/cars.entity";
import { ICarsAdCreate, ICarsAdUpdate } from "../interface/carsAd.interface";
import { paginate } from "../utils/pagination.util";
import { CarImage } from "../entities/carImages.entity";
import { Users } from "../entities/user.entity";
import { CreateCarsAdResponseSerializer } from "../serializers/carsAd.serializers";

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
      const arrImg: CarImage[] = images;

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
      relations: { images: true, user: true },
    });

    delete carsAd.user.password;

    return carsAd;
  }

  static async listAll(query: object) {
    const carsRepository = AppDataSource.getRepository(CarAd);

    const cars = await carsRepository.find({ relations: { images: true } });

    return {
      message: "Produtos listados com sucesso",
      ...paginate({
        list: cars.reverse(),
        query,
      }),
    };
  }

  static async listOne(carId: any) {
    const carsRepository = AppDataSource.getRepository(CarAd);

    const carsAd = await carsRepository.findOne({
      where: { id: carId },
      relations: { images: true },
    });

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
