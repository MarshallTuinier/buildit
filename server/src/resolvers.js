// Below we define our resolvers for our GraphQL queries

const { GraphQLScalarType } = require("graphql");
const moment = require("moment");
const { User } = require("./models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getUserId } = require("./utils");
const nodeMailer = require("nodemailer");
const { welcomeEmail } = require("./emails");

const transporter = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.FROM_EMAIL,
    pass: process.env.GMAIL_PASSWORD
  }
});

const JWT_SECRET = process.env.JWT_SECRET;

// Grab a randmon choice from an array. In this case, it will randomly assign
// an avatar color to a new user

const randomChoice = arr => {
  return arr[Math.floor(arr.length * Math.random())];
};

const avatarColors = [
  "D81B60",
  "F06292",
  "F48FB1",
  "FFB74D",
  "FF9800",
  "F57C00",
  "00897B",
  "4DB6AC",
  "80CBC4",
  "80DEEA",
  "4DD0E1",
  "00ACC1",
  "9FA8DA",
  "7986CB",
  "3949AB",
  "8E24AA",
  "BA68C8",
  "CE93D8"
];

const resolvers = {
  Query: {
    async getUser(root, args, context) {
      const userId = getUserId(context);
      const user = await User.findById(userId);
      return { user };
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
      transporter.sendMail(welcomeEmail(email, user));

      return user;
    },

    async signup(root, { id, firstname, lastname, password }) {
      const user = await User.findById(id);
      const common = {
        firstname,
        lastname,
        name: `${firstname} ${lastname}`,
        avatarColor: randomChoice(avatarColors),
        password: await bcrypt.hash(password, 10),
        status: "Active"
      };
      if (user.role === "Owner") {
        const team = await Team.create({
          name: `${common.name}'s Team`
        });
        user.set({
          ...common,
          team: team.id,
          jobTitle: "CEO/Owner/Founder"
        });
      } else {
        user.set(common);
      }
      await user.save();
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
      return { token, user };
    },

    async login(root, { email, password }) {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("No user with that email");
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error("Incorrect password");
      }
      const token = jwt.sign({ id: user.id, email }, JWT_SECRET);
      return { token, user };
    }
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
