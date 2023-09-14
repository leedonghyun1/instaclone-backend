import { withFilter } from "apollo-server-express";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import client from "../../client";

export default {
  Subscription: {
    roomUpdates: {
      subscribe: async (root, args, context, info) => {
        const room = await client.room.findFirst({
          where: {
            id: args.id,
            users: {
              some: {
                id: context.loggedInUser.id,
              }
            }
          },
          select: {
            id: true,
          }
        });
        if (!room) {
          // withFilter에서는 return 값이 boolean 이어야됨.
          throw new Error("You can't see this.")
        }
        return withFilter(
          () => pubsub.asyncIterator(NEW_MESSAGE),
          async ({ roomUpdates }, { id }, { loggedInUser }) => {
            if (roomUpdates.roomId === id) {
              // 유저가 room에서 kickout 시 아래 코드 실행.
              const room = await client.room.findFirst({
                where: {
                  id,
                  users: {
                    some: {
                      id: loggedInUser.id,
                    }
                  }
                },
                select: {
                  id: true,
                }
              });
              if(!room){
                return false
              }
              return true
            }
          }
          // withFilter의 호출 결과값을 아래(root, args, context, info)을 통해 return.
        )(root, args, context, info);  
      }
    }
  }
}