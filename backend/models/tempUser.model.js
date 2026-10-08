const mongoose = require("mongoose");

const tempUserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: [true, "username should be unique"],
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  feedBack: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message",
    },
  ],

  otp: {
    type: String,
    required: true,
  },

  expiresTime: {
    type: Date,
    required: true,
    default: Date.now() + 2 * 60 * 1000,
  },
});

tempUserSchema.index({ expiresTime: 1 }, { expireAfterSeconds: 120 });

module.exports = mongoose.model("tempUser", tempUserSchema);
