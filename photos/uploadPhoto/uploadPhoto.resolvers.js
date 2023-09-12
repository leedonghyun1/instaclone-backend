import client from "../../client";
import { protectedResolver } from "../../uesrs/users.utils"
import { processHashtags } from "../photos.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(async (_, { file, caption }, { loggedInUser }) => {
      if (caption) {
        hashtagObjs = processHashtags(caption)
      };
      
      return client.photo.create({
        data: {
          file,
          caption,
          user:{
            connect:{
              id: loggedInUser.id,
            },
          },
         ...(hashtagObjs.length > 0 && {
          hashtags: {
            connectOrCreate: hashtagObjs,
           }
         })
        },
      })
    })
  }
}