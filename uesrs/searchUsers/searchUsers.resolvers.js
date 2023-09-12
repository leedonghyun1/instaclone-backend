import client from "../../client"

export default {
  Query: {
    searchUsers: async (_, { keyword }) => {
      if (keyword === "" || keyword === null) {
        return;
      }
      const user = await client.user.findMany({
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          }
        }
      });
      return user || null;
    }
  }
}