const mongoose = require("mongoose");
const Workout = require("./workout");

const nameSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

nameSchema.pre("remove", function (next) {
  Workout.find({ name: this.id }, (err, workouts) => {
    if (err) {
      next(err);
    } else if (workouts.length > 0) {
      next(new Error("There are workout(s) using this name"));
    } else {
      next();
    }
  });
});

module.exports = mongoose.model("Name", nameSchema);