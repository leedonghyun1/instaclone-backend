import client from "../../client";

export default {
  Query: {
    searchPhotos: async (_, { keyword }) =>
      client.photo.findMany({
        where: {
          caption: {
            contains: keyword,
          }
        }
      })
  }
}