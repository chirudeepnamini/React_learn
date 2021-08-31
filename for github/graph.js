const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");

const resolvers = require("./graphql/resolvers/index");
const typeDefs = require("./graphql/typeDefs");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return req.headers;
  },
});

mongoose
  .connect(
    "MONGO_URL=mongodb+srv://chirudeep:peppermint@cluster0.mdo5w.mongodb.net/merng",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
