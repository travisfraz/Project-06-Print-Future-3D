if (process.env.NODE_env !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Products = require('./product_model')
const bodyParser = require('body-parser')
const path = require('path')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' }, {limits: {fieldSize: 5000000}})
const methodOverride = require('method-override')
const fs = require('fs')

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

const uploadEngine = upload.fields([
    {name: 'main', maxCount: 1},
    {name: 'acc', maxCount: 8}
])







app.get('/api/load', async (req, res) =>{
    try {
        const data = await Products.find({})
        res.json(data)
    } catch(err) {
        console.log(err)
    }
})

app.post('/api/newproduct', uploadEngine, async (req, res) => {

    const productData = new Products()

    for (i=0; i < req.files.acc.length; i++) {
        const obj = {
            data: fs.readFileSync(req.files['acc'][i].path),
            contentType: req.files['acc'][i].mimetype
        }
        productData.accImgs.push(obj)
    }

    productData.name = req.body.name
    productData.desc = req.body.desc
    productData.price = req.body.price
    productData.mainImg.data = fs.readFileSync(req.files['main'][0].path)
    productData.mainImg.contentType = req.files['main'][0].mimetype

    try {
        console.log(productData)
        productData.save()
        res.redirect('/maintenance')
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
