const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
  title: {type: String, required:false},
  description: {type: String, required:false}
});

module.exports = mongoose.model("video", schema);
