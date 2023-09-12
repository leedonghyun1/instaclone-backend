require("dotenv").config();
import express from "express";
import { ApolloServer } from "apollo-server-express";
import schema from "./schema";
import { getUser } from "./uesrs/users.utils";
import logger from "morgan";

const PORT = process.env.PORT;

const apollo = new ApolloServer({
    schema,
    context: async ({req}) => {
      return{
        loggedInUser: await getUser(req.headers.token),
      };
    },
  });

  const app = express();
  app.use(logger("tiny"));
  app.use(express.static("uploads"));
  apollo.applyMiddleware({app});
  app.listen({ port: PORT }, () => {
    console.log(`server is running on http://localhost:${PORT}`)
  })