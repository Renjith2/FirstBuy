// server.js

const express = require('express');
const db = require('./DBCOnfig'); // Import database configuration

const app = express();
app.use(express.json())
const port = 9234;
var cors=require('cors')
app.use(cors())
const userroute= require('./apis/userRoute')
app.use('/api/user',userroute)



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/ss', (req, res) => {
  res.send("HIIIII");
});
