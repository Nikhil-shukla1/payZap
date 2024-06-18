const express = require("express");
const apiRouter = require("./routes/router");
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

//testing home
app.get('/',(req,res)=>{
  return res.json({meessage: "Hi from the home"});
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
