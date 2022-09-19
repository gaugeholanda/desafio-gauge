const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StoreSchema = new Schema({
  slug: {
    type: String,
    required: true,
    maxLength: 30,
    unique: true
  },
  banner_url: {
    type: String,
    default: null
  }
});

module.exports = Item = mongoose.model('store', StoreSchema);