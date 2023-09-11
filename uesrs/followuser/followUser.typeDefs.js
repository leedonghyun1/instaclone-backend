import { gql } from "apollo-server-express";

export default gql`
type FolloUserResult{
  ok:Boolean!
  error:String
}
type Mutation{
  followUser(username:String!):FolloUserResult
}
`;