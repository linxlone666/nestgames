const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("../frontend"));

app.use("/api/games", require("./routes/games"));
app.use("/api/keys", require("./routes/keys"));
app.use("/api/orders", require("./routes/orders"));

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
