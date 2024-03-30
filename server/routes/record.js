const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This section will help you get a list of all the records.
recordRoutes.route("/hotels").get(async function (req, res) {
  // Get records
  let db = dbo.getDb();
  let collection = await db.collection("hotels");
  let results = await collection.find({}).limit(8).toArray();
  res.send(results).status(200);
});

recordRoutes.route("/hotels/:city").get(async function (req, res) {
  // Get records
  let db = dbo.getDb();
  const city = req.params.city;
  console.log("city" + req.params);
  let collection = await db.collection("hotels");
  let results = await collection.find({ city: city }).limit(8).toArray();
  res.send(results).status(200);
});

module.exports = recordRoutes;
