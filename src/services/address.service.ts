import { Request, Response } from "express";
import Address from "../entities/address.entity";
import AppDataSource from "../data-source";

class AddressService {
  static async update(addressData: any, userId: string) {
    const addressRepository = AppDataSource.getRepository(Address);

    const address = await addressRepository.findOneBy({ id: userId });

    const addressUpdate: any = addressRepository.create({
      ...address,
      ...addressData,
    });

    await addressRepository.save(addressUpdate);

    return addressUpdate;
  }
}

export default AddressService;
