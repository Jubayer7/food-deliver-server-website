const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient } = require('mongodb');
require('dotenv').config()

const port = process.env.PORT || 5000;

// use middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.z3zf1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri)

async function run() {
    try {
        await client.connect();
        const database = client.db('food-delivery');
        const foodCollection = database.collection('foods');
        const allinforamtion = database.collection('information');

        // GET API
        app.get('/foods', async (req, res) => {
            const cursor = foodCollection.find({})
            const foods = await cursor.toArray()
            res.send(foods);
        })

        // POST API
        app.post('/information', async (req, res) => {
            const information = req.body;
            console.log('hit the post', information)
            const result = await allinforamtion.insertOne(information)

            res.json(result);
        })



    }
    finally {


    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('I am cheking my website now ')
})

app.listen(port, () => {
    console.log('the server', port)
})