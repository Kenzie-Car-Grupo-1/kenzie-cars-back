import { Request, Response } from "express";
import Address from "../entities/address.entity";
import AppDataSource from "../data-source";
import { Users } from "../entities/user.entity";

class AddressService {
  static async update(addressData: any, userId: string, addressId: string) {
    const addressRepository = AppDataSource.getRepository(Address);
    const userRepository = AppDataSource.getRepository(Users)

    const user = await userRepository.findOneBy({ id: userId })

    // const address = await addressRepository.findOneBy({ id: userId });
    const address = await addressRepository.findOne({
      where: { id: addressId },
      relations: { user: true },
    });

    const addressUpdate: any = addressRepository.create({
      ...address,
      ...addressData,
      user: user
    });

    await addressRepository.save(addressUpdate);

    return addressUpdate;
  }
}

export default AddressService;
