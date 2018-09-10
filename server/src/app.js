const { GraphQLServer } = require("graphql-yoga");
const mongoose = require("mongoose");
require("dotenv").config();
const resolvers = require("./resolvers");

//Connect to our MongoDB using the given uri
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback) {
  console.log("Connection Succeeded");
});

//Initiate the GraphQL Server from graphql-yoga with our defined schema and resolvers
const server = new GraphQLServer({
  typeDefs: "src/schema.graphql",
  resolvers,
  context: req => req
});

//Options object for the GraphQL Server
const options = {
  port: process.env.PORT || 5500,
  endpoint: "/graphql",
  subscriptions: "/subscriptions",
  playground: "/playground"
};

//Start the GraphQL server with the above options
server.start(options, ({ port }) =>
  console.log(`Server is running on port ${port}`)
);
