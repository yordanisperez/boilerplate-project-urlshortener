require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
const app = express();
const mongoConect=require('./conection/conectionMongo')


try {
    mongoConect.connect(process.env.DB_URI)
} catch (e) {
    console.log(e);
}


// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true })); //Usar el bodyparser que enta incluido en express
app.use('/public', express.static(`${process.cwd()}/public`));
app.use(routes({}));



// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
