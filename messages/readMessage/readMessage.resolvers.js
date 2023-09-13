import client from "../../client";
import { protectedResolver } from "../../uesrs/users.utils";

export default{
  Mutation:{
    readMessage:protectedResolver(async(_,{id},{loggedInUser})=>{
      const message = await client.message.findFirst({
        where:{
          id,
          userId:{
            not:loggedInUser.id
          },
          room:{
            users:{
              some:{
                id:loggedInUser.id
              }
            }
          }
        },
        select:{
          id:true,
        }
      })
      if(!message){
        return {
          ok:false,
          error:"Unread message not found."
        };
      }
      await client.message.update({
        where:{
          id,
        },
        data:{
          read:true,
        }
      });
      return{
        ok:true,
      }
    })
  }
}