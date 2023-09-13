import { gql } from "apollo-server";

export default gql`
type Mutation{
  editProfile(
  firstName:String
  lastName:String
  username:String
  email:String
  bio:String
  avatar:Upload
  password:String):MutationResponse!
}
scalar Upload
`