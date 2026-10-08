const express = require("express");
const connectDB = require("./config/connectDB");
const authRouter = require("./routes/auth");
const cookieParser = require('cookie-parser');
const userRouter = require("./routes/user");
const cors = require("cors");
const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "8.8.4.4",
]);

require("dotenv").config();

const PORT = process.env.PORT || 6000;

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));


app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/user",userRouter);




app.listen(PORT, () => {
  console.log(`server is listening at port number : ${PORT}`);
});



connectDB();
