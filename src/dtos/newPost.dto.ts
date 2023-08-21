import z from "zod"

export interface CreatePostInputDTO {
    creatorId: string,
    content: string
    likes: number,
    dislikes: number
}

export interface CreatePostOutputDTO {
    message: string
    post: {
        id: string,
        creator_id: string,
        content: string
        likes: number,
        dislikes: number,
        created_at: string,
        updated_at: string
    }
}

export const CreatePostSchema = z.object({
    content: z
    .string({
        required_error: "'Content' não pode ser vazio.",
        invalid_type_error: "'Content' deve ser do tipo string."
    })
    .min(1, "'Content' deve possuir no mínimo 1 caractere")
}).transform (data => data as CreatePostInputDTO)