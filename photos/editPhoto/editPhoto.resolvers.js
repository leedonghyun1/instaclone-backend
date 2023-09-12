import client from "../../client";
import { protectedResolver } from "../../uesrs/users.utils";
import { processHashtags } from "../photos.utils";

export default {
  Mutation: {
    editPhoto: protectedResolver(async (_, { id, caption }, { loggedInUser }) => {
      if (!loggedInUser.id) {
        return {
          ok: false,
          error: "Not valid user."
        }
      }
      const oldPhoto = await client.photo.findUnique({
        where: {
          id,
          userId:loggedInUser.id
        },
        include:{
          hashtags:{
            select:{
              hashtag:true,
            }
          }
        }
      })
      if (!oldPhoto) {
        return {
          ok: false,
          error: "Photo not found."
        }
      }
      const updatePhoto = await client.photo.update({
        where:{
          id,
        },
        data:{
          caption,
          hashtags:{
            disconnect:oldPhoto.hashtags,
            connectOrCreate:processHashtags(caption),
          }
        }
      })
      if(!updatePhoto){
        return{
          ok:false,
          error:"Update-Photo error,",
        }
      }
      return {
        ok:true,
      }
    })
  }
}