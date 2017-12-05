
const mongoose = require('mongoose');

const wineSchema = mongoose.Schema({
  name_of_winery: { type: String, require: true },
  year: { type: String, require: true },
  region: { type: String, require: true },
  country: String,
  url: String,
  submitted_by: { type: String, require: true }
});

module.exports = mongoose.model('Wine', wineSchema);
