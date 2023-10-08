import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    docName: {
      type: String,
      required: true,
    },
    docId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "documents",
    },
  },
  {
    timestamps: true,
  }
);

const request =
  mongoose.models.requests || mongoose.model("requests", RequestSchema);
export default request;
