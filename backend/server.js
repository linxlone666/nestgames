const express = require("express");
const app = express();
const gamesRouter = require("./routes/games");
const keysRouter = require("./routes/keys");
const ordersRouter = require("./routes/orders");

app.use(express.json());
app.use("/api/games", gamesRouter);
app.use("/api/keys", keysRouter);
app.use("/api/orders", ordersRouter);

app.use(express.static("../frontend"));

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
