import client from "../../client"

const resolvers = {
  Query: {
    seeProfile: (_, { username }) =>
      client.user.findUnique({
        where: {
          username,
        },
      }),
  },
};

export default resolvers;