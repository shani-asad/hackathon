const mongoose = require('mongoose');
const Notes = require('../models/Notes');

const notesGet = (req, res) => {
  Notes.find({ })
    .exec()
    .then((data) => {
      res.status(201).json({
        data,
        message: 'gud',
      });
    });
};

const notesPost = (req, res) => {
  const notes = new Notes({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
  });

  notes.save()
    .then((data) => {
      res.status(201).json({
        data,
        message: 'gud',
      });
    });
};

module.exports = {
  notesGet,
  notesPost,
};
