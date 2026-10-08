const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: [true, "username should be unique"],
    },
    profileUrl : {
        type : String,
        required : true,
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
    acceptingFeedback: {
      type : Boolean,
      default : false,
    }
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
