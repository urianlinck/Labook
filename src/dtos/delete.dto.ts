import z from 'zod'

export interface DeleteUserInputDTO {
    id: string,
    password: string
}

export interface DeleteUserOutputDTO {
    message: string
}

export const DeleteUserSchema = z.object({
    id: z
    .string({
        required_error: "'ID' é obrigatório.",
        invalid_type_error: "'Password' deve ser do tipo string."
    }),
    password: z
    .string({
        required_error: "'Password' é obrigatório",
        invalid_type_error: "'Password' deve ser do tipo string"
    })
    .min(4, "'Password' deve possuir no mínimo 4 caracteres")
}).transform(data => data as DeleteUserInputDTO)