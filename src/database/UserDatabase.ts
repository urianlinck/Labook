import { UsersDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  public static TABLE_USERS = "users";

  public findUserbyEmail = async (email: string): Promise<UsersDB> => {
    const [existingEmail]: UsersDB[] = await BaseDatabase.connection(
      UserDatabase.TABLE_USERS
    )
      .select()
      .where({ email });

    return existingEmail;
  };

  public insertUser = async (user: UsersDB): Promise<void> => {
    await BaseDatabase.connection(UserDatabase.TABLE_USERS).insert(user);
  };

  public deleteUser = async (id: string): Promise<void> => {
    await BaseDatabase.connection(UserDatabase.TABLE_USERS)
      .where({ id: id })
      .delete(id);
  };
}
