import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: String,
  role: {
    type: String,
    default: "user",
  },
  assignedCart: String,
});

export default mongoose.model("users", userSchema);
