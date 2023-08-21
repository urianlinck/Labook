import z from 'zod'

export interface LoginUserInputDTO {
    email: string,
    password: string
}

export interface LoginUserOutputDTO {
    message: string
}

export const LoginUserSchema = z.object({
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
    .min(4, "'Password' deve possuir no mínimo 4 caracteres")
}).transform(data => data as LoginUserInputDTO)
