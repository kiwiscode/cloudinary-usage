// routes/movie.routes.js

const express = require("express");

const router = express.Router();

const Movie = require("../models/Movie.model");
// ********* require fileUploader in order to use it *********
const fileUploader = require("../config/cloudinary.config");

// GET route to display the form to create a new movie
router.get("/movies/create", (req, res) =>
  res.render("movie-views/movie-create")
);

// POST route for saving a new movie in the database
// This route has the image upload example
router.post(
  "/movies/create",
  fileUploader.single("movie-cover-image"),
  (req, res) => {
    const { title, description } = req.body;

    console.log("REQ FILE =>", req.file);

    console.log(title, description);

    Movie.create({ title, description, imageUrl: req.file.path })
      .then((newlyCreatedMovieFromDB) => {
        console.log("NEW MOVIE THAT WE CREATED = >", newlyCreatedMovieFromDB);

        res.redirect("/movies");
      })
      .catch((error) =>
        console.log(`Error while creating a new movie: ${error}`)
      );
  }
);

router.get("/movies", (req, res) => {
  Movie.find()
    .then((moviesFromDB) => {
      console.log(moviesFromDB);

      res.render("movie-views/movies-list.hbs", { movies: moviesFromDB });
    })
    .catch(() => {
      res.status(404).json({ message: "Movies not found!" });
    });
});

router.get("/movies/:id/edit", (req, res) => {
  const { id } = req.params;

  Movie.findById(id)
    .then((movieToEdit) => {
      res.render("movie-views/movie-edit", movieToEdit);
    })
    .catch(() => {
      res.status(404).json({ errorMessage: "Movie not found!" });
    });
});

router.post(
  "/movies/:id/edit",
  fileUploader.single("movie-cover-image"),
  (req, res) => {
    const { id } = req.params;
    const { title, description, existingImage } = req.body;

    let imageUrl;
    console.log(title, description, existingImage);
    if (req.file) {
      imageUrl = req.file.path;
    } else {
      imageUrl = existingImage;
    }

    Movie.findByIdAndUpdate(id, { title, description, imageUrl }, { new: true })
      .then((updatedMovie) => {
        console.log(updatedMovie);
        // res.redirect("/movies");
      })
      .catch(() => {
        res.status(404).json({
          erroMessage: "Error occured while editing the current movie!",
        });
      });
  }
);

module.exports = router;
