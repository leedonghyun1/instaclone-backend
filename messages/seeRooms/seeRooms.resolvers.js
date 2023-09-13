import client from "../../client";
import { protectedResolver } from "../../uesrs/users.utils";

export default {
  Query:{
    seeRooms: protectedResolver(async (_, __, { loggedInUser }) => client.room.findMany({
      where:{
        users:{
          some:{
            id:loggedInUser.id
          }
        }
      }
    })
    )
  }
}