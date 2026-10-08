const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("message", messageSchema);
