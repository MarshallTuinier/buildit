// Create a Mongo Schema to help visualize the db structure

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// The buildModel function abstracts a bit of boilerplate, and inserts timestamps into every model

const buildModel = (name, schema) => {
  return mongoose.model(name, new Schema(schema, { timestamps: true }));
};

const Folder = buildModel("Folder", {
  name: String,
  description: String,
  shareWith: [
    {
      kind: String,
      item: { type: ObjectId, refPath: "shareWith.kind" }
    }
  ],
  parent: { type: ObjectId, ref: "folder" }
});

module.exports.Folder = Folder;

module.exports.Team = Folder.discriminator(
  "Team",
  new Schema({}, { timestamps: true })
);

// Below we build the User model for the db

module.exports.User = buildModel("User", {
  name: {
    type: String,
    default: ""
  },
  firstname: String,
  lastname: String,
  email: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  jobTitle: {
    type: String,
    default: ""
  },
  avatarColor: String,
  team: { type: ObjectId, ref: "Team" },
  role: String,
  status: String
});

module.exports.Group = buildModel("Group", {
  team: { type: ObjectId, ref: "team" },
  name: String,
  initials: String,
  avatarColor: String,
  users: [{ type: ObjectId, ref: "User" }]
});
