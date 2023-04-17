import { Request, Response } from "express";
import AppDataSource from "../data-source";
import { Users } from "../entities/user.entity";
import Address from "../entities/address.entity";

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

  static async update(req: Request, res: Response) {}

  static async delete(req: Request, res: Response) {}
}

export default UsersService;
