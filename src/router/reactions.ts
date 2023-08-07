import express, { Request, Response } from "express";
import { db } from "../database/knex";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.put("/:id/like", async(req: Request, res: Response) =>{
    try{
        const {id} = req.params;
        const userID = req.body.user_id;
        const like = req.body.reaction;

        if(like){
            await db("likes_dislikes").insert({"user_id":userID, "post_id":id, "like":1});
        }else{
            await db("likes_dislikes").insert({"user_id":userID, "post_id":id, "like":0});
        }

        return res.status(200).send(like);
        
    } catch (error: any) {
    console.error(error);

    res.status(500);
    // if (res.statusCode === 200) {
    // }
    res.send(error.message);
  }
})