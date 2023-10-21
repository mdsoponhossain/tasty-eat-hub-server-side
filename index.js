const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


// userId: tastyEatsHub and pass: WjG4rizT9ypBPugh



app.use(express.json());
app.use(cors());




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
        const tastyEatsCollection = database.collection("tastyEatsCollection");
        const brandSliderCollection = database.collection("brandSliderCollection");
        const userCartCollection = database.collection("userCartCollection");



        app.get('/brandDetails',async(req,res)=>{
            const products = req.body;
            const cursor = await tastyEatsCollection.find().toArray();
            res.send(cursor)
        })


        app.get('/brandDetails/:id',async(req,res)=>{
            const id = req.params.id;
            const query ={_id:new ObjectId(id)}
            const result =await tastyEatsCollection.findOne(query);
            res.send(result)
            
        })
        app.put('/brandDetails/:id',async(req,res)=>{
            const id = req.params.id;
            const filter = {_id:new ObjectId(id)};
            const options = { upsert: true };
            const updateProduct = {
                $set:{
                   photo:req.body.photo,
                   name:req.body.name,
                   brand:req.body.brand,
                   price:req.body.price,
                   description:req.body.description,
                   rating:req.body.rating,
                   type:req.body.type

                }
            }
            const result =await tastyEatsCollection.updateOne(filter,updateProduct,options);
            res.send(result)
            
        })


        //update product ;

        // app.patch('/')



        //Slider image storing;
        app.get('/slider',async(req,res)=>{
            // const sliderInfo = req.body;
            const cursor = await brandSliderCollection.find().toArray();
            res.send(cursor)
        })

        // //get user collection ;
        // app.get('/userCart',async(req,res)=>{
        //   const cursor = await userCartCollection.find().toArray();
        //   res.send(cursor)
           
        // })


        app.get('/userCart/:email',async(req,res)=>{
           const email = req.params.email;
           const query = {userEmail:email } 
          
          const cursor = await userCartCollection.find(query).toArray();
          res.send(cursor)
           
        })
        //delete user collection
        app.delete('/userCart/:id',async(req,res)=>{
            const id = req.params.id;
            const query ={_id: new ObjectId(id)};
            const cursor = await userCartCollection.deleteOne(query);
            res.send(cursor)
        })





        app.post('/product',async(req,res)=>{
            const productInfo = req.body;
            const result = await tastyEatsCollection.insertOne(productInfo);
            res.send(result)

        })

        // user collection ;


        app.post('/userCart',async(req,res)=>{
            const userCartInfo = req.body
            const result = await userCartCollection.insertOne(userCartInfo);
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