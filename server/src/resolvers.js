// Below we define our resolvers for our GraphQL queries

const { GraphQLScalarType } = require("graphql");
const moment = require("moment");
const { User } = require("./models");

const resolvers = {
  Query: {
    test(_, args, context) {
      return "Hello World!!";
    }
  },
  Mutation: {
    // The capture email mutation grabs a user email, checks it against already signed up emails,
    // and if there isn't one, creates a user with an Owner role. Status is pending as the user has yet to sign up
    async captureEmail(_, { email }) {
      const isEmailTaken = await User.findOne({ email });
      if (isEmailTaken) {
        throw new Error("This email is already taken");
      }
      const user = await User.create({
        email,
        role: "Owner",
        status: "Pending"
      });
      return user;
    },

    // TODO
    async signup(_, { id, firstname, lastname, password }) {},

    // TODO
    async login(_, { email, password }) {}
  },

  // Define our Date scalar, so we call getTime() and parse with moment.js
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue: value => moment(value).toDate(), // value from the client
    serialize: value => value.getTime(), // value sent to the client
    parseLiteral: ast => ast
  })
};
module.exports = resolvers;
