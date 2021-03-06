const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  rating: {type: String, required:false},
  review: {type: String, required:false}
});

const schema = new Schema({
  title: {type: String, required:true},
  description: {type: String, required:false},
  averageRating: {type: String, required:false},
  reviews: [reviewSchema]
});

module.exports = mongoose.model("video", schema);
