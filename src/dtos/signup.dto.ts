import z from 'zod'

export interface CreateUserInputDTO {
    name: string,
    email: string,
    password: string,
    role: string
}

export interface CreateUserOutputDTO {
    message: string,
    user: {
        id: string,
        name: string,
        email: string,
        role: string,
        createdAt: string
    }
}

export const CreateUserSchema = z.object({
    name: z
    .string({
        required_error: "'Name' é obrigatório.",
        invalid_type_error: "'Name' deve ser do tipo string."
    })
    .min(2, "'Name' deve possuir no mínimo 2 caracteres"),
    email: z
    .string({
        required_error: "'Email' é obrigatório",
        invalid_type_error: "'Email' deve ser do tipo string"
    })
    .email("'Email' inválido"),
    password: z
    .string({
        required_error: "'Password' é obrigatório",
      invalid_type_error: "'Password' deve ser do tipo string"
    })
    .min(4, "'Password' deve possuir no mínimo 4 caracteres"),
    role: z
    .string({
        required_error: "'Role' é obrigatório",
        invalid_type_error: "'Role' deve ser do tipo string"
    })
    .min(4, "'Role' deve possuir no mínimo 4 caracteres")
}).transform(data => data as CreateUserInputDTO)