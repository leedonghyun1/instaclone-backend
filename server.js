require("dotenv").config();
import express from "express";
import { ApolloServer } from "apollo-server-express";
import schema from "./schema";
import { getUser } from "./uesrs/users.utils";
import logger from "morgan";
import pubsub from "./pubsub";
import http from "http";

const PORT = process.env.PORT;

const apollo = new ApolloServer({
  schema,
  context: async (ctx) => {
    if (ctx.req) {
      return {
        loggedInUser: await getUser(ctx.req.headers.token),
      };
    } else {
      const { connection: { context }, } = ctx;
      return {
        loggedInUser: context.loggedInUser,
      }
    }
  },
  // 로그인 되어 있는 유저만 subscribe를 할 수 있게 설정. apollo server의 자체 기능.
  subscriptions: {
    onConnect: async ({ token }) => {
      if (!token) {
        throw new Error("You can't listen.");
      };
      const loggedInUser = await getUser(token);
      return {
        loggedInUser,
      }
    }
  }
});

const app = express();
app.use(logger("tiny"));
apollo.applyMiddleware({ app });
app.use(express.static("uploads"));
const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`)
})