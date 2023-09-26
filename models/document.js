const mongoose = require("mongoose");

const RESTRICTED = "Restricted";

const DocumentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      default: "",
    },
    isTemplate: {
      type: Boolean,
      default: false,
    },
    isStarred: {
      type: Boolean,
      default: false,
    },
    accessType: {
      type: String,
      default: RESTRICTED,
    },
    editors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    viewers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

const document =
  mongoose.models.documents || mongoose.model("documents", DocumentSchema);
module.exports = document;
