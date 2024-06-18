const express = require("express");
const apiRouter = require("./routes/index");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use("/api/v1", apiRouter);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
