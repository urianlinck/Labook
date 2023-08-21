import express, { Request, Response } from "express";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { PostBusiness } from "../business/PostsBusiness";

const router = express.Router();

export class PostController {
  constructor(private postBussines: PostBusiness) {}

  public toPost = async (req: Request, res: Response) => {
    try {
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado.");
      }
    }
  };
}
