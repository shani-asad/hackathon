const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    title: {
      type: String,
      required: true,
    },
    description: String,
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('Notes', NotesSchema);
