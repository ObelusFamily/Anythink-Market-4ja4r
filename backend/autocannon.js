"use strict";

const autocannon = require("autocannon");

autocannon(
  {
    url: "http://localhost:3000/api/items",
    connections: 100,
    amount: 100,
  },
  console.log
);
