import { Request, Response } from "express";
import AppDataSource from "../data-source";
import { Users } from "../entities/user.entity";
import Address from "../entities/address.entity";
import { CarAd } from "../entities/cars.entity";
import { paginate } from "../utils/pagination.util";
import { hash } from "bcryptjs";

class UsersService {
  static async create(data: any) {
    const userRepository = AppDataSource.getRepository(Users);
    const addressRepository = AppDataSource.getRepository(Address);

    const { address, ...userData } = data;

    const createdUser: any = userRepository.create(userData);
    await userRepository.save(createdUser);

    address.user = createdUser;

    const newAddress: any = addressRepository.create(address);
    await addressRepository.save(newAddress);

    const response: any = await userRepository.findOne({
      where: { id: createdUser.id },
      relations: { address: true },
    });
    const { password, ...userResponse } = response;

    return userResponse;
  }

  static async listOne(userId: string) {
    const userRepository = AppDataSource.getRepository(Users);
    const response: any = await userRepository.findOne({
      where: { id: userId },
      relations: { address: true },
    });
    const { password, ...userResponse } = response;

    return userResponse;
  }

  static async listAllCars(userId: string, query: object) {
    const userRepository = AppDataSource.getRepository(Users);
    const findUser: any = await userRepository.findOne({
      where: { id: userId },
      relations: { cars: true },
    });

    return {
      message: "Carros listados com sucesso",
      ...paginate({
        list: findUser.cars.reverse(),
        query,
      }),
    };
  }

  static async update(userData: any, userId: string) {
    const userRepository = AppDataSource.getRepository(Users);

    const findUser = await userRepository.findOneBy({
      id: userId,
    });

    if (userData.password !== undefined) {
      userData.password = await hash(userData.password, 10);
    }

    const userUpdated = await userRepository.update(findUser!.id, userData);

    const { password, ...userWithoutPass } = (await userRepository.findOneBy({
      id: userId,
    })) as any;

    return userWithoutPass;
  }

  static async delete(id: string): Promise<any> {
    const userRepository = AppDataSource.getRepository(Users);

    const user = await userRepository.delete({
      id: id,
    });

    return user;
  }
}

export default UsersService;
