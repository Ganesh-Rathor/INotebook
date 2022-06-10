const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors')
const app = express()
const port = 80;

connectToMongo();


// ******You need thise for reading user type detail in json formate
app.use(express.json());

app.use(cors());

// *******For calling routes module add reaquire after "adress("/",require(path))"
    // you can use "app.get" function only in home "/"
    app.get('/',require("./routes/Home"))
    // otherwise you nee to use " app.use" function for routes modules function 
    app.use('/auth',require("./routes/User"))
    app.use('/user/',require("./routes/Notes"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})