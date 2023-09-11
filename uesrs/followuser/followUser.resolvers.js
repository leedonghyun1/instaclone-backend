import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation:{
    followUser: protectedResolver(async(_, { username }, { loggedInUser })=>{
      const validUsername = await client.user.findUnique({
        where:{
          username,
        }
      })
      if(!validUsername){
        return{
          ok:false,
          error:"User does not exist.",
        }
      }
      await client.user.update({
        where:{
          id: loggedInUser.id,
        },
        data:{
          following:{
            connect:{
              username,
            }
          }
        }
      });
      return{
        ok:true,
      }
    })
  }
}