const typeDefs = `
  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type User {
    id: ID!
    name: UserName
    email: String
    username: String
    address: Address
    posts: [Post]
    postCount: Int
    commentCount: Int
  }

  type UserName {
    firstName: String
    lastName: String
  }

  type Address {
    street: String
    suite: String 
  }

  type Post {
    id: Int!
    title: String
    body: String
    comments: [Comment]
  }

  type Comment {
    id: ID!
    name: String!
    email: String!
    body: String
  }
`;

export default typeDefs