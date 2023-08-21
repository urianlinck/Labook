import { BadRequestError } from "../errors/BadRequestError";
import { PostDatabase } from "../database/PostDatabase";
import { CreatePostInputDTO, CreatePostOutputDTO } from "../dtos/newPost.dto";
import { PostsDB } from "../types";
import { Post } from "../models/Post";
import { IdGenerator } from "../services/IdGenerator";

export class PostBusiness {
  constructor(
    private postDatabase: PostDatabase,
    private idGenerator: IdGenerator
  ) {}

  public newPost = async (
    input: CreatePostInputDTO
  ): Promise<CreatePostOutputDTO> => {
    const id = this.idGenerator.generate();
    const { creatorId ,content } = input;

    const likes = 0
    const dislikes = 0

    const newPost = new Post(
      id,
      creatorId,
      content,
      likes,
      dislikes,
      new Date().toISOString(),
      new Date().toISOString()
    );

    const newPostDB: PostsDB = {
      id: newPost.getId(),
      creator_id: newPost.getCreatorId(),
      content: newPost.getContent(),
      likes: newPost.getLikes(),
      dislikes: newPost.getDislikes(),
      created_at: newPost.getCreatedAt(),
      updated_at: newPost.getUpdatedAt(),
    };
    await this.postDatabase.insertPost(newPostDB);

    const output: CreatePostOutputDTO = {
      message: "Postado.",
      post: {
        id: newPost.getId(),
        creator_id: newPost.getCreatorId(),
        content: newPost.getContent(),
        likes: newPost.getLikes(),
        dislikes: newPost.getDislikes(),
        created_at: newPost.getCreatedAt(),
        updated_at: newPost.getUpdatedAt(),
      },
    };
    return output;
  };
}
