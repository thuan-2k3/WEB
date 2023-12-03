const express = require("express")
const path = require("path")
const app = express()
const hbs = require("hbs")
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017/reviews_db';
//const viewpath = path.join(_dirname,"../view/templates")

async function connectToMongoDB() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Đã kết nối thành công đến MongoDB');
        const database = client.db('reviews_db');
        const collection = database.collection('LogInCollection');


        const documents = await collection.find({}).toArray();

        console.log('Dữ liệu trong collection:');
        console.log(documents);



    } finally {
        await client.close();
    }
}


connectToMongoDB();

const collection = require("./mongo")

const tempelatePath = path.join(__dirname, "C:\Users\User\Desktop\TH_CSDLNC\LOGINSIGNUPTUTORIAL\view")

app.use(express.json())

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, "../view"))
app.use(express.json())

app.get('/', (req, res) => {
    res.render(__dirname + "login")
})


app.get('/signup', (req, res) => {
    res.render('signup')
})

app.post('/signup', async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    }

    await collection.insertMany([data])
    res.render("home")

})


app.listen(3000, () => {
    console.log("port connected");
})
