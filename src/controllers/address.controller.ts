import { Request, Response } from "express";
import AddressService from "../services/address.service";

class AddressController {
  static async update(req: Request, res: Response) {
    const userId: string = req.user.id;
    const addressData = req.body;

    const response: any = await AddressService.update(addressData, userId);

    return res.status(200).json(response);
  }
}

export default AddressController;
