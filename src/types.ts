export type UsersDB = {
    id: string,
    name: string,
    email: string,
    password: string,
    role: string,
    created_at: string
};

export type PostsDB = {
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string
};

export type LikesDislikesDB = {
    user_id: string,
    post_id: string,
    like: number
};