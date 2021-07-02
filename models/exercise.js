const mongoose = require("mongoose");
const Workout = require("./workout");

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
});

exerciseSchema.pre("remove", function (next) {
  Workout.find({ exercise: this.id }, (err, workouts) => {
    if (err) {
      next(err);
    } else if (workouts.length > 0) {
      next(new Error("There are workout(s) using this exercise"));
    } else {
      next();
    }
  });
});

module.exports = mongoose.model("Exercise", exerciseSchema);