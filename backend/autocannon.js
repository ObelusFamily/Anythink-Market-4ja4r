const autocannon = require("autocannon");
const url = "http://localhost:3000/api/items?limit=100&offset=0";

autocannon(
  {
    url,
    amount: 100,
    connections: 100,
    timeout: 60,
  },
  console.log
);
