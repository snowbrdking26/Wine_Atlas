const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  author: String,
  content: { type: String, required: true },
  wine: { type: mongoose.Schema.Types.ObjectId, ref: 'Wine'}
});

module.exports = mongoose.model('Comment', commentSchema);
