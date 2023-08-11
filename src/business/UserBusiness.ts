import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { UserDatabase } from "../database/UserDatabase";

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
  ) {}

  async signup(input: any) {
    const { name, email, password, role } = input;
    const id = this.idGenerator.generate()

    if (!name || !email || !password || !role) {
      throw new Error("Nome, email, senha e role são obrigatórios");
    }
    const existingEmail = await this.userDatabase.findUserbyEmail(email)

    if (existingEmail) {
      throw new Error("'Email' já cadastrado.");
    }

    const newUserDB = {
      id: id,
      name: name,
      email: email,
      password: password,
      role: role,
      created_at: new Date().toISOString(),
    };
    //transformar em um insert no UserDatabase
    await this.userDatabase.insertUser(newUserDB);
    return "Cadastro realizado com sucesso!";
  }

  async erase(input: any) {
    const {id} = input;

    if (!id) {
      throw new Error("ID não encontrada");
    }

    await this.userDatabase.deleteUser(id);
    return "Usuário deletado.";
  }



//   async login(email: string, password: string) {
//     if (!email || !password) {
//       throw new Error("Usuário ou senha inválidos.");
//     }

//     const [existingEmail] = await db("users")
//       .select()
//       .where("email", "LIKE", email);

//     const [correctPassword] = await db("users")
//       .select()
//       .where("password", "LIKE", password);

//     if (existingEmail && correctPassword) {
//       // Procedimento de login
//       return "Logado com sucesso.";
//     } else {
//       throw new Error("Usuário ou senha inválidos.");
//     }
//   }

//   async update(
//     id: string,
//     newName: string,
//     newEmail: string,
//     newPassword: string,
//     newPassword2: string
//   ) {
//     if (!id) {
//       throw new Error("ID não encontrada");
//     }

//     if (newPassword !== newPassword2) {
//       throw new Error("Senhas não conferem.");
//     }

//     const [user] = await db("users").select().where({ id: id });

//     if (user) {
//       const updateUser = {
//         name: newName || user.name,
//         email: newEmail || user.email,
//         password: newPassword || user.password,
//       };
//       await db("users").where({ id: id }).update(updateUser);
//       return "Usuário atualizado com sucesso!";
//     } else {
//       throw new Error("Usuário não encontrado.");
//     }
//   }

//   async delete(id: string) {
//     try {
//       if (!id) {
//         throw new Error("ID não encontrada.");
//       }

//       await db("users").where({ id }).del();
//       return "Usuário excluído com sucesso!";
//     } catch (error) {
//       console.error("Erro ao deletar usuário:", error);
//       throw new Error("Erro ao deletar usuário.");
//     }
//   }
}
