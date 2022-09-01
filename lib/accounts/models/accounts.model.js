import mongoose from "mongoose";
import { v4 } from "uuid";
const { Schema } = mongoose;

const accountSchema = new Schema({
  accountId: {
    type: String,
    default: v4,
    required: true,
    unique: true
  },
  
  name: {
    type: String,
    required: true,
    unique: true
  },
  
  balance: {
    type: Number,
    min: 0,
    default: 0,
    required: true,
  },
});

export default mongoose.model("Account", accountSchema);