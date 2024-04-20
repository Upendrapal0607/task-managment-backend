const express = require("express");
const { dbConnection } = require("./db/db");
const { userRoute } = require("./routes/user.route");
const cors = require("cors");
const { taskRoute } = require("./routes/task.route");
const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  console.log({ body: req.body, query: req.query });
  try {
    res.status(200).json({ message: "welcome to task api" });
  } catch (error) {
    res.status(404).json({ error, message: "Error getting" });
  }
});
app.use("/user", userRoute);
app.use("/task", taskRoute);

app.use((req, res, next) => {
  res.status(404).send({ message: "route Not found" });
});

app.listen(PORT, async () => {
  console.log("Server is running on port: " + PORT);
  try {
    await dbConnection;
    console.log("Connected to database");
  } catch (error) {
    console.log({ error });
  }
});
