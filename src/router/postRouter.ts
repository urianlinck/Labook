import express from 'express'

export const postRouter = express.Router();

const postController = new PostController(
    new PostBusiness(
        new PostDatabase()
    )
)

postRouter.post("/post", postController.)