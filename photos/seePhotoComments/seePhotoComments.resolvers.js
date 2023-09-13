import client from "../../client";

export default {
  Query: {
    seePhotoComments: (_, { id }) => client.comment.findMany({
      where: {
        photoId: id
      },
      take: 10,
      orderBy: {
        createdAt: "asc"
      },
    })
  }

}