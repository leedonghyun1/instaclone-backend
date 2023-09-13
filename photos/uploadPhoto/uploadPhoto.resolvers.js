import client from "../../client";
import { uploadToS3 } from "../../shared/shared.utils";
import { protectedResolver } from "../../uesrs/users.utils"
import { processHashtags } from "../photos.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(async (_, { file, caption }, { loggedInUser }) => {
      if (caption) {
        hashtagObjs = processHashtags(caption)
      };

      const fileUrl = await uploadToS3(file, loggedInUser.id, "uploads");
      
      return client.photo.create({
        data: {
          file:fileUrl,
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