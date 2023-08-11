import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// router.post("/signup", async (req: Request, res: Response) => {
//   try {
//     const { name, email, password, role } = req.body;
//     let userUUID = uuidv4();
//     if (!name || !email || !password || !role) {
//       return res
//         .status(400)
//         .json({ error: "Nome, email, senha e role são obrigatórios!" });
//     }

//     const [existingEmail] = await db("users")
//       .select()
//       .where("email", "LIKE", `%${email}%`);

//     if (existingEmail) {
//       throw new Error("'Email' já cadastrado.");
//     }

//     const newUser = {
//       id: userUUID,
//       name: name,
//       email: email,
//       password: password,
//       role: role,
//       created_at: Date.now(),
//     };
//     await db("users").insert(newUser);
//     return res.status(201).send("Cadastro realizado com sucesso!");
//   } catch (error: any) {
//     console.error(error);

//     if (res.statusCode === 200) {
//       res.status(500);
//     }
//     res.send(error.message);
//   }
// });

router.post("/login", async (req: Request, res: Response) =>{
  try{
    const {email, password} = req.body;

    if (!email || !password){
      return res.status(400).json({error: "Usuário ou senha inválidos."})
    }

    const [existingEmail] = await db("users")
      .select()
      .where("email", "LIKE", email);

    const [correctPassword] = await db("users").select().where("password", "LIKE", password)

    if (existingEmail && correctPassword) {
      return res.status(200).send("Logado com sucesso.");
    }

  }catch (error: any) {
    console.error(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
})

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const newName = req.body.name as string | undefined;
    const newEmail = req.body.email as string | undefined;
    const newPassword = req.body.password as string | undefined;
    const newPassword2 = req.body.password2 as string | undefined;

    if (!id) {
      return res.status(404).json({ error: "ID não encontrada." });
    }

    if (newPassword !== newPassword2) {
      return res.status(400).json({ error: "Senhas não conferem." });
    }

    const [user] = await db("users").select().where({ id: id });

    if (user) {
      const updateUser = {
        name: newName || user.name,
        email: newEmail || user.email,
        password: newPassword || user.password,
      };
      await db("users").where({ id: id }).update(updateUser);
    }
    return res.status(200).send("Usuário atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return res.status(500).json({ error: "Erro ao atualizar usuário." });
  }
});

// router.delete("/:id", async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;

//     if (!id) {
//       return res.status(400).json({ error: "ID não encontrada" });
//     }

//     await db("users").where({ id }).del();
//     return res.status(200).send("Usuário excluído com sucesso!");
//   } catch (error) {
//     console.error("Erro ao atualizar usuário:", error);
//     return res.status(500).json({ error: "Erro ao deletar usuário." });
//   }
// });

module.exports = router;
