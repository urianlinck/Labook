import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { UserDatabase } from "../database/UserDatabase";
import { CreateUserInputDTO, CreateUserOutputDTO } from "../dtos/signup.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { UsersDB } from "../types";
import { User } from "../models/User";
import { DeleteUserInputDTO, DeleteUserOutputDTO } from "../dtos/delete.dto";
import { LoginUserInputDTO, LoginUserOutputDTO } from "../dtos/login.dto";

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
  ) {}
  
  public signup = async (input: CreateUserInputDTO): Promise<CreateUserOutputDTO> => {
    const id = this.idGenerator.generate()
    const { name, email, password, role } = input;

    const existingEmail = await this.userDatabase.findUserbyEmail(email)

    if (existingEmail) {
      throw new BadRequestError("'Email' já cadastrado.");
    }
    const newUser = new User(
      id,
      name,
      email,
      password,
      role,
      new Date().toISOString()
    )
    const newUserDB: UsersDB = {
      id: newUser.getId(),
      name: newUser.getName(),
      email: newUser.getEmail(),
      password: newUser.getPassword(),
      role: newUser.getRole(),
      created_at: newUser.getCreatedAt()
    };
    await this.userDatabase.insertUser(newUserDB);
    const output: CreateUserOutputDTO = {
      message: "Cadastro realizado com sucesso!",
      user: {
        id: newUser.getId(),
        name: newUser.getName(),
        email: newUser.getEmail(),
        role: newUser.getRole(),
        createdAt: newUser.getCreatedAt()
      }
    }
    return output
  }

  public login = async (input: LoginUserInputDTO): Promise<LoginUserOutputDTO> => {
    const {email, password} = input;

    await this.userDatabase.findUserbyEmail(email);

    const output: LoginUserOutputDTO = {
      message: "Bem-vinde!"
    }

    return output;
  }
  
  public erase = async (input: DeleteUserInputDTO): Promise<DeleteUserOutputDTO> => {
    const {id, password} = input;

    await this.userDatabase.deleteUser(id);

    const output: DeleteUserOutputDTO = {
      message: "Cadastro deletado.",
    }
    return output;
  }
}
