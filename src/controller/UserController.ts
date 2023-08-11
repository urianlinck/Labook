import express, { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";

const router = express.Router();

export class UserController {
  constructor(private userBusiness: UserBusiness) {}

  public signup = async (req: Request, res: Response) => {
    try {
      const { name, email, password, role } = req.body;
      const input = {
        name,
        email,
        password,
        role,
      };
      const result = await this.userBusiness.signup(input);
      return res.status(201).send(result);
    } catch (error: any) {
      console.error(error);
      return res.status(500).send(error.message);
    }
  };

  public erase = async (req: Request, res: Response) => {
    try {
      const input = { id: req.params.id };

      const result = await this.userBusiness.erase(input);
      return res.status(200).send(result);
    } catch (error: any) {
      console.error(error);
      return res.status(500).send(error.message);
    }
  };
}
