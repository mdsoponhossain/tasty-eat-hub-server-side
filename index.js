const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


// userId: tastyEatsHub and pass: WjG4rizT9ypBPugh



app.use(express.json());
app.use(cors());




const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://tastyEatsHub:WjG4rizT9ypBPugh@cluster0.yfrjdbj.mongodb.net/?retryWrites=true&w=majority";

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

        const database = client.db("tastyEatsDB");
        const tastyEatsCollection = database.collection("tastyEatsCollection")


        app.post('/product',async(req,res)=>{
            const productInfo = req.body;
            const result = await tastyEatsCollection.insertOne(productInfo);
            res.send(result)

        })



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('hello world')
})


app.listen(port, () => {
    console.log(`the server is running on the port number:${port}`)
})