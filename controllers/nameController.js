const Name = require("../models/name");
const Workout = require("../models/workout");

exports.nameList = async (req, res) => {
  try {
    const names = await Name.find({});
    res.render("names/nameList", { names: names });
  } catch {
    res.redirect("/");
  }
};
exports.nameCreateGet = (req, res) => {
  res.render("names/nameCreate");
};
exports.nameCreatePost = async (req, res) => {
  const name = new Name({
    name: req.body.name,
  });
  try {
    await name.save();
    res.redirect("/names");
  } catch {
    res.render("partials/error", { message: " creating name" });
  }
};
exports.nameId = async (req, res) => {
  try {
    const name = await Name.findById(req.params.id);
    const workouts = await Workout.find({ name: name.id }).populate("exercise");
    res.render("names/nameId", { name: name, workouts: workouts });
  } catch {
    res.render("partials/error", { message: " finding name" });
  }
};
exports.nameDelete = async (req, res) => {
  try {
    const name = await Name.findById(req.params.id);
    await name.remove();
    res.redirect("/names");
  } catch {
    res.render("partials/error", {
      message: ": There are workout(s) using this name",
    });
  }
};