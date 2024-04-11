import mongoose from "mongoose";

export default mongoose.model(
  "User",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: false,
      },
      interests: {
        type: String,
        required: false,
      },
    },
    {
      timestamps: true,
    },
  ),
);
