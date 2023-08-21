import express, { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { CreateUserSchema } from "../dtos/signup.dto";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { DeleteUserSchema } from "../dtos/delete.dto";
import { LoginUserSchema } from "../dtos/login.dto";

const router = express.Router();

export class UserController {
  constructor(private userBusiness: UserBusiness) {}

  public signup = async (req: Request, res: Response) => {
    try {
      const input = CreateUserSchema.parse({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      });
      const output = await this.userBusiness.signup(input);
      res.status(201).send(output);
    } catch (error) {
      console.log(error)

      if (error instanceof ZodError){
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError){
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado.");
      }
    }
  };

  public login = async (req: Request, res: Response) => {
    try{
      const input = LoginUserSchema.parse({
        email: req.body.email,
        password: req.body.password
      });
      const output = await this.userBusiness.login(input);
      res.status(202).send(output);
    }catch (error) {
      console.log(error)

      if (error instanceof ZodError){
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError){
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado.");
      }
    }
  }

  public erase = async (req: Request, res: Response) => {
    try {
      const input = DeleteUserSchema.parse({ 
        id: req.params.id,
        password: req.body.password });

      const output = await this.userBusiness.erase(input);
      return res.status(200).send(output);
    } catch (error) {
      console.log(error)

      if (error instanceof ZodError){
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError){
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado.");
      }
    }
  };
}
