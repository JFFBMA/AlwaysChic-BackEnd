const express = require("express");
const router = Router();

router.get("/test", (req, res) => {
  const data = {
    name: "Fazt",
    website: "faztweb.com",
  };
  res.json(data);
});

module.exports = router;
