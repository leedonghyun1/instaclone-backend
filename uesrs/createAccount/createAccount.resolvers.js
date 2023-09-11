import client from "../../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (_, {
      firstName,
      lastName,
      username,
      email,
      password,
    }) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              }
            ]
          }
        });
        if (existingUser) {
          throw new Error("This Username/Password is already taken.");
        }

        const hashPassword = await bcrypt.hash(password, 10)
        return client.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password: hashPassword,
          }
        })
      } catch(error) {
        return error;
      }
    },
  }
}