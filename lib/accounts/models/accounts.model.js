const mongoose = require("mongoose");
const uuid = require("uuid");
const { Schema } = mongoose;

const accountSchema = new Schema({
  accountId: {
    type: String,
    default: uuid.v4,
    required: true
  },
  
  name: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    min: 0,
    default: 0,
    required: true,
  },
});

module.exports = mongoose.model("Account", accountSchema);