if (process.env.NODE_env !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Products = require('./product_model')
const bodyParser = require('body-parser')
const path = require('path')
const crypto = require('crypto')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const methodOverride = require('method-override')
const { resolve } = require('path')

const app = express()

// Middleware
app.use(cors())
app.use(methodOverride('_method'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( { limit: '1mb', extended: false } ))

// Creates connection to database
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', error => console.log(error))
db.on('open', () => console.log('MongoDB connected'))

// Create storage engine
const storage = new GridFsStorage({
    url: process.env.DATABASE_URL,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err)
                }
                const filename = buf.toString('hex') + path.extname(file.originalname)
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                }
                resolve(fileInfo)
            })
        })
    }
})
const upload = multer({ storage })







app.get('/api/load', async (req, res) =>{
    try {
        const data = await Products.find({})
        res.json(data)
    } catch(err) {
        console.log(err)
    }
})

app.post('/api/new', cors(), async (req, res) => {
    console.log(req.body)
    const productData = new Products({
        name: req.body.name,
        desc: req.body.desc,
        price: req.body.price
    })
    try {
        const newProductEntry = await productData.save()
        res.send( {response: 'success'} )
    } catch(err) {
        res.send( {response: 'No Good'} )
        console.log(err)
    }
})

app.post('/api/newimg', upload.single('file'), async (req, res) => {
    console.log(req.body)
    try {
        res.json( {msg: 'Worked bitch'} )
    }
    catch(err) {
        res.send(err)
    }
})


const port = 5000
app.listen(process.env.PORT || port, () => console.log('Server Running'))























/*const data = [
    {key: 1, name: 'Cute Geometric Flower Vase', price: 11.99, desc: 'This is a short description of the flower vase. This vase is the best. No other vase can compete. It is super duper, and no other vase is like it. Plants love this vase. Just look at this succulant. It loves the vase!', img: 'geometric_vase'},
    {key: 2, name: 'Personalized Pressure Cooker Steam Cover', price: 9.99, desc: '', img: 'ppcooker_cover'},
    {key: 3, name: '3D Topographical Map of the World', price: 49.99, desc: '', img: 'topographical_map'},
    {key: 4, name: 'Personalized 3D Printed Picture (LithoPhane)', price: 7.99, desc: '', img: 'lithophane'},
    {key: 5, name: 'Personalized Picture Frame', price: 3.99, desc: '', img: 'lithophane_frame'},
    {key: 6, name: 'Personalized Book/Page Holder', price: 5.99, desc: '', img: 'page holder'},
    {key: 7, name: 'Four Personalized Coasters with Holder', price: 24.99, desc: '', img: 'coaster'},
    {key: 8, name: 'Personalized Bag/Purse Hook', price: 4.99, desc: '', img: 'hook'},
    {key: 9, name: 'Spaghetti Serving Measurement Utensil', price: 7.00, desc: '', img: 'sphaghetti_tool'},
    {key: 10, name: 'Travel Friendly/Portable Necklace Display', price: 6.00, desc: '', img: 'necklace_display'},
    {key: 11, name: 'Custom Kitchen/Office Organizer', price: 10.00, desc: '', img: 'organizer'},
    {key: 12, name: 'Custom 3D Printing Service', price: 35.00, desc: '', img: 'custom'}
]*/
