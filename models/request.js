const mongoose = require("mongoose");

const requested = mongoose.Schema({
  name: String,
  requesterId: String,
  desc: String,
  image: String,
  city: String,
  state: String,
  country: String,
  pincode: Number,
  time: Number,
});

const requestModel = mongoose.model("requests", requested);

module.exports = { requestModel };
