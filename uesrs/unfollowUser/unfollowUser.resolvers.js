import client from "../../client";
import { protectedResolver } from "../users.utils";

export default{
  Mutation:{
    unfollowUser: protectedResolver(async(_,{username}, {loggedInUser})=>{
      const validUsername = await client.user.findUnique({
        where:{
          username,
        },
      })
      if(!validUsername){
        return {
          ok:false,
          error:"Can't unfollow user",
        };
      }
      await client.user.update({
        where:{
          id:loggedInUser.id,
        },
        data:{
          following:{
            disconnect:{
              username,
            },
          },
        },
      });
      return {
        ok:true,
      }
    })
  }
}