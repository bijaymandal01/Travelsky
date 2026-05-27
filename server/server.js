const express = require("express");
const cors = require("cors");

const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000 ;
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send({message: "hello BIjay"})
})

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});