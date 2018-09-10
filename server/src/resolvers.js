// Below we define our resolvers for our GraphQL queries

const resolvers = {
  Query: {
    test(root, args, context) {
      return "Hello World!";
    }
  }
};
module.exports = resolvers;
