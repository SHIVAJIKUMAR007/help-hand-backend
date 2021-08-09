const mongoose = require("mongoose");

const reqMob = mongoose.Schema({
  requesterId: String,
  accepterId: String,
  accept: Boolean,
});
reqMob.index({ requesterId: "text", accepterId: "text" });
const reqMobModel = mongoose.model("reqMobs", reqMob);
module.exports = { reqMobModel };
