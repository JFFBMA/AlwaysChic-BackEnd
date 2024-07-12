const { Router } = require("express");

const router = Router();

router.get("/", async (req, res) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  res.json(data);
});

module.exports = router;
