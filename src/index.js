const express = require("express")
const path = require("path")
const app = express()
const hbs = require("hbs")
const { MongoClient } = require('mongodb')
const collection = require("./mongo")

app.use(express.json())

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, "..", "view", "templates"))

app.get('/', (req, res) => {
    // Kết nối MongoDB khi đến route này
    connectToMongoDB();
    
    // Render view login của bạn
    res.render("login.ejs");
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.post('/signup', async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    }

    await collection.insertMany([data])
    res.render("/")
})

app.post('/login', async (req, res) => {
    const username = req.body.username; // Thay vì req.body.name, giả sử tên trường là 'username'
    const password = req.body.password;

    // Thực hiện kiểm tra tên người dùng và mật khẩu ở đây, có thể sử dụng cơ sở dữ liệu hoặc cách xác thực khác

    // Giả sử xác thực thành công, bạn có thể chuyển hướng người dùng sang trang 'home'
    res.redirect('/home');
});

app.get('/home', (req, res) => {
    res.render('home');
})


app.listen(3000, () => {
    console.log("Server is running on port 3000");
})

async function connectToMongoDB() {
    const uri = 'mongodb://localhost:27017/reviews_db';
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


