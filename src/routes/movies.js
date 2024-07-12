const { Router } = require("express");
const router = Router();
const _ = require("underscore");
const movies = require("../sample.json");

router.get("/", (req, res) => {
  res.json(movies);
});

router.post("/", (req, res) => {
  const id = movies.length + 1;
  const { title, director, year, rating } = req.body;

  if (id && title && director && year && rating) {
    const newMovie = { id, ...req.body };
    movies.push(newMovie);
    res.json(movies);
  } else {
    res.status(500).json({
      error:
        "Error en el POST porque falta alguno de los siguientes elementos: Título, director, año o rating.",
    });
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, director, year, rating } = req.body;
  if (id && title && director && year && rating) {
    _.each(movies, (movie, i) => {
      if (movie.id === parseInt(id)) {
        movie.title = title;
        movie.director = director;
        movie.year = year;
        movie.rating = rating;
      }
    });
    res.json(movies);
  } else {
    res.status(500).json({ error: "Falta uno de los datos del objeto." });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (id) {
    _.each(movies, (movie, i) => {
      if (movie.id === parseInt(id)) {
        console.log("entra al if iterando");
        movies.splice(i, 1);
      }
    });
    res.json(movies);
  }
});

module.exports = router;
