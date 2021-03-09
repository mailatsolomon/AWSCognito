
const express = require ('express');
const router = express.Router();

const defaultRoute = require ("./default");

router.get("/", (_req, res) => {
  res.status(200).json({
    message: "Hello from v1",
  });

});

router.use("/default", defaultRoute);

module.exports = router;
