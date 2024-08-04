import express from "express";
import { config } from 'dotenv';
import { MongoClient } from 'mongodb';
import bodyParser from "body-parser";
import cors from "cors"
config()
// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'lockbox';
const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(cors())


 client.connect()
 
 app.get('/', async(req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
  res.json(findResult)
})
 
 app.post('/', async(req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password)
  res.json({success:true,result:findResult})
})
 
 app.delete('/', async(req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password)
  res.json({success:true,result:findResult})
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
} )