import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  purchase_datetime: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: String,
    required: true,
  },
});

export default mongoose.model("tickets", ticketSchema);
