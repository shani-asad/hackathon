const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    type: String,
  },
  {
    versionKey: false,
  },
);
module.exports = mongoose.model('Users', userSchema);
