const Workout = require("../models/workout");
const Name = require("../models/name");
const Exercise = require("../models/exercise");

exports.workoutList = async (req, res) => {
  try {
    const workouts = await Workout.find()
      .sort({ date: -1 })
      .limit(5)
      .populate("name")
      .populate("exercise")
      .exec();
    res.render("workouts/workoutList", { workouts: workouts });
  } catch {
    console.log("hi");
  }
};

exports.workoutCreateGet = async (req, res) => {
  try {
    const names = await Name.find({});
    const exercises = await Exercise.find({});
    res.render("workouts/workoutCreate", {
      names: names,
      exercises: exercises,
    });
  } catch {
    res.redirect("/");
  }
};
exports.workoutCreatePost = async (req, res) => {
  const workout = new Workout({
    name: req.body.name,
    exercise: req.body.exercise,
    date: new Date(req.body.date),
    description: req.body.description,
  });
  try {
    await workout.save();
    res.redirect("/");
  } catch {
    res.render("partials/error", { message: " posting workout" });
  }
};
exports.workoutId = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id)
      .populate("name")
      .populate("exercise")
      .exec();
    res.render("workouts/workoutId", { workout: workout });
  } catch {
    res.render("partials/error", { message: " finding workout" });
  }
};
exports.workoutEditGet = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    const names = await Name.find({});
    const exercises = await Exercise.find({});
    res.render("workouts/workoutEdit", {
      workout: workout,
      names: names,
      exercises: exercises,
    });
  } catch {
    res.redirect("/");
  }
};
exports.workoutEditPost = async (req, res) => {
  try {
    await Workout.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      exercise: req.body.exercise,
      date: new Date(req.body.date),
      description: req.body.description,
    });
    res.redirect("/");
  } catch {
    res.render("partials/error", { message: " editing workout" });
  }
};
exports.workoutDelete = async (req, res) => {
  try {
    await Workout.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch {
    res.render("partials/error", { message: " deleting workout" });
  }
};