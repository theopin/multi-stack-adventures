const mongoose = require("mongoose");
const uuid = require("uuid");
const { Schema } = mongoose;

const accountSchema = new Schema({

  name: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    min: 0,
    default: 0,
    required: false,
  },
});

module.exports = mongoose.model("account", accountSchema);
