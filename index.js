const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()

const app = express()

app.use(bodyParser.json());
app.use(cors());

const port = 5200

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qeqox.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const productsCollection = client.db("kidsGallery").collection("products");
 
  app.post('/addProduct', (req, res) =>{
    const product = req.body;
     productsCollection.insertOne(product)
    .then(result => {
     res.send(result.insertedCount)
    })
  })

  app.get('/product', (req, res) => {
    productsCollection.find({})
    .toArray((err, document) => {
      res.send(document[0]);
    })
  })

});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)