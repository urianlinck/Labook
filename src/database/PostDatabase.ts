import { BaseDatabase } from "./BaseDatabase";
import {PostsDB} from "../types"

export class PostDatabase extends BaseDatabase {
    public static TABLE_POSTS = "posts"

    public insertPost = async(post: PostsDB): Promise<void> => {
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
        .insert(post)
    }

    // public getPost = async(post: PostsDB): Promise<> => {

    // }
}