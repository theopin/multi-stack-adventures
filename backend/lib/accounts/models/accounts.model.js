import mongoose from "mongoose";
const { Schema } = mongoose;

const accountSchema = new Schema({  
  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    default: "user",
    required: true,
  },

  balance: {
    type: Number,
    min: 0,
    default: 0,
    required: true,
  },
});

export default mongoose.model("Account", accountSchema);