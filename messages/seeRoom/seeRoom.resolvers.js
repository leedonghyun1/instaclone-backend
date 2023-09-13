import client from "../../client";
import { protectedResolver } from "../../uesrs/users.utils";

export default{
  Query:{
    seeRoom:protectedResolver((_,{id},{loggedInUser})=> client.room.findFirst({
      where:{
        id,
        users:{
          some:{
            id:loggedInUser.id
          }
        }
      } 
    }))
  }
}