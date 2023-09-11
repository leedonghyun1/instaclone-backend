import client from "../../client"

export default {
  Query: {
    seeFollowers: async (_, { username, page }) => {
      const validUseranme = await client.user.findUnique({
        where:{
          username
        },
        select:{
          id:true,
        }
      })
      if(!validUseranme){
        return{
          ok:false,
          error:"User not found.",
        }
      }
      const followers = await client.user.findUnique({
        where: {
          username,
        }
      }).followers({
        take: 5,
        skip: (page-1)*5,
      });
      //following에 username에 해당 하는 value가 있으면 count
      const totalFollowers = await client.user.count({
        where: {
          following: {
            some: {
              username
            }
          }
        }
      })
      return {
        ok: true,
        followers,
        totalPages: Math.ceil(totalFollowers / 5),
      }
    }
  }
}