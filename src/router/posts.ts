import express, { Request, Response } from "express";
import { db } from "../database/BaseDatabase";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.post("/post", async (req: Request, res: Response) => {
  try {
    const { creator_id, content } = req.body;
    let postUUID = uuidv4();

    if (!creator_id || !content) {
      return res.status(400).json({
        error: "Necessário estar logado e ter um conteúdo na postagem.",
      });
    }
    let amountLike = 0;
    let amountDislike = 0;

    const newPost = {
      id: postUUID,
      creator_id,
      content,
      likes: amountLike,
      dislikes: amountDislike,
      created_at: Date.now(),
      updated_at: Date.now(),
    };

    await db("posts").insert(newPost);
    return res.status(201).send("Postado!");
  } catch (error: any) {
    console.error(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

router.get("/post", async (req: Request, res: Response) => {
  try {
    const result = await db("posts").select();
    return res.status(200).send(result);
  } catch (error: any) {
    console.error(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

router.put("/post/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const newContent = req.body.content as string | undefined;

    const [post] = await db("posts").select().where({ id: id });

    if (post) {
      const editPost = {
        creator_id: post.creator_id,
        content: newContent || post.content,
        likes: post.likes,
        dislikes: post.dislikes,
        created_at: post.created_at,
        updated_at: Date.now(),
      };
      await db("posts").where({ id: id }).update(editPost);
    }
    return res.status(200).send("Post atualizado.");
  } catch (error: any) {
    console.error(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

router.delete("/post/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID não encontrada" });
    }

    await db("posts").where({ id }).del();
    return res.status(200).send("Postagem excluída com sucesso!");
  } catch (error: any) {
    console.error(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

router.put("/:id/like", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userID = req.body.user_id;
    const like = req.body.like;

    let reactionUUID = uuidv4();

    const [post] = await db("posts").where({ id: id });

    if (like) {
      await db("likes_dislikes").insert({
        id: reactionUUID,
        user_id: userID,
        post_id: id,
        like: 1,
      });
      await db("posts")
        .where({ id: id })
        .update({ likes: post.likes + 1 });
    } else {
      await db("likes_dislikes").insert({
        id: reactionUUID,
        user_id: userID,
        post_id: id,
        like: 0,
      });
      await db("posts")
        .where({ id: id })
        .update({ dislikes: post.dislikes + 1 });
    }

    return res.status(200).send(like);
  } catch (error: any) {
    console.error(error);

    res.status(500);

    res.send(error.message);
  }
});
module.exports = router;
