const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  name: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Name" },
  exercise: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Exercise",
  },
  date: {
    type: Date,
    require: true,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("Workout", workoutSchema);