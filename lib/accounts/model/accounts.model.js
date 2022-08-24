const mongoose = require("mongoose");
const uuid = require("uuid");
const { Schema } = mongoose;

const accountSchema = new Schema({

  name: {
    type: String,
    required: true,
  },
  balance: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("account", accountSchema);
