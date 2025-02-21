const express = require('express')
const mongoose = require('mongoose');
const { DataModel, formatResponse, getHighestAlphabet } = require('./data');
const cors = require("cors")
require('dotenv').config()

const app = express()
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
const port = 7777
app.use(express.json())
async function main(){
    await mongoose.connect(process.env.DB_URL)
}
main().then(()=> console.log("Aye Aye from MongoDB")).catch(err => console.log(err));
app.get('/bfhl', (req, res) => {
  res.status(200).send('operation code: 1')
})
app.post("/bfhl", (req, res) => {
    const { data } = req.body;
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ error: "Invalid data format" });
    }
  
    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => /^[A-Za-z]+$/.test(item));
    const highest_alphabet = alphabets.sort().slice(-1);
  
    res.json({ numbers, alphabets, highest_alphabet });
  });


app.listen(port, () => {
  console.log(`Qualifier app listening on port ${port}`)
})