const express = require("express");
const router = express.Router();

const nameController = require("../controllers/nameController");
const exerciseController = require("../controllers/exerciseController");
const workoutController = require("../controllers/workoutController");

//name routes
router.get("/names", nameController.nameList);
router.get("/names/create", nameController.nameCreateGet);
router.post("/names/create", nameController.nameCreatePost);
router.get("/names/:id", nameController.nameId);
router.post("/names/:id/delete", nameController.nameDelete);

//exercise routes
router.get("/exercises", exerciseController.exerciseList);
router.get("/exercises/create", exerciseController.exerciseCreateGet);
router.post("/exercises/create", exerciseController.exerciseCreatePost);
router.get("/exercises/:id", exerciseController.exerciseId);
router.get("/exercises/:id/edit", exerciseController.exerciseEditGet);
router.post("/exercises/:id/edit", exerciseController.exerciseEditPost);
router.post("/exercises/:id/delete", exerciseController.exerciseDelete);

//workout routes
router.get("/", workoutController.workoutList);
router.get("/workouts/create", workoutController.workoutCreateGet);
router.post("/workouts/create", workoutController.workoutCreatePost);
router.get("/workouts/:id", workoutController.workoutId);
router.get("/workouts/:id/edit", workoutController.workoutEditGet);
router.post("/workouts/:id/edit", workoutController.workoutEditPost);
router.post("/workouts/:id/delete", workoutController.workoutDelete);

module.exports = router;