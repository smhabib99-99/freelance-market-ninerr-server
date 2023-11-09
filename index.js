


const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


// console.log(process.env.DB_PASS)

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tng5w16.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

    const jobsCollection = client.db('jobsDB').collection('jobs');


    app.get('/jobs',async(req,res)=>{
        const cursor = jobsCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    app.post('/jobs', async(req,res)=>{
        const newJobs = req.body;
        console.log(newJobs);
        const result = await jobsCollection.insertOne(newJobs);
        res.send(result);
    })





    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req, res)=>{
    res.send('Ninerr is running')
})

app.listen(port, ()=>{
    console.log(`Ninerr server is running on port: ${port}`)
})