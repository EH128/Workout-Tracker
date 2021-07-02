const Exercise = require("../models/exercise");

exports.exerciseList = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.render("exercises/exerciseList", { exercises: exercises });
  } catch {
    res.redirect("/");
  }
};
exports.exerciseCreateGet = (req, res) => {
  res.render("exercises/exerciseCreate");
};
exports.exerciseCreatePost = async (req, res) => {
  const exercise = new Exercise({
    name: req.body.exercise,
    description: req.body.description,
  });
  try {
    await exercise.save();
    res.redirect("/exercises");
  } catch {
    res.render("partials/error", { message: " creating exercise" });
  }
};
exports.exerciseId = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    res.render("exercises/exerciseId", { exercise: exercise });
  } catch {
    res.render("partials/error", { message: " finding exercise" });
  }
};
exports.exerciseEditGet = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    res.render("exercises/exerciseEdit", { exercise: exercise });
  } catch {
    res.redirect("/exercises");
  }
};
exports.exerciseEditPost = async (req, res) => {
  try {
    await Exercise.findByIdAndUpdate(req.params.id, {
      name: req.body.exercise,
      description: req.body.description,
    });
    res.redirect("/exercises");
  } catch {
    res.render("partials/error", { message: " editing exercise" });
  }
};
exports.exerciseDelete = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    await exercise.remove();
    res.redirect("/exercises");
  } catch {
    res.render("partials/error", {
      message: ": There are workout(s) using this exercise",
    });
  }
};