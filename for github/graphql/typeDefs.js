const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  type User {
    id: ID!
    username: String!
    token: String!
    email: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    email: String!
    confirmpassword: String!
  }
  type Query {
    getPosts: [Post]
    getPost(PostId: ID!): Post!
  }

  type Mutation {
    register(registerinput: RegisterInput): User!
    login(email: String, password: String): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
  }
`;
module.exports = typeDefs;
