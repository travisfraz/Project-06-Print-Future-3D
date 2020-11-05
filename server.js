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
app.use(bodyParser.urlencoded( { limit: '1mb', extended: true } ))

// Creates connection to database
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
const db = mongoose.connection
db.on('error', error => console.log(error))
db.on('open', () => console.log('MongoDB connected'))

// Create storage engine

const uploadEngine = upload.fields([
    {name: 'main', maxCount: 1},
    {name: 'acc', maxCount: 8}
])





app.get('/api/home', async (req, res) =>{
    try {
        const data = await Products.find({}, 'name mainImg category')
        res.json(data)
    } catch(err) {
        console.log(err)
    }
})

app.get('/api/products', async (req, res) =>{
    try {
        const data = await Products.find({}, 'name mainImg')
        res.json(data)
    } catch(err) {
        console.log(err)
    }
})

app.get('/api/productdetail', async (req, res) => {
    const query = { _id: req.query._id }
    try {
        const data = await Products.find(query)
        console.log(data)
        res.json(data)
    } catch(err) {
        console.log(`Error! ${err}`)
    }
})


app.get('/api/search', async (req, res) => {
    try {
        const data = await Products.find({ name: { $regex: req.query.criteria, $options: 'i' }})
        res.send(data)
    } catch(err) {
        console.log(`Error! ${err}`)
        res.redirect('http://localhost:3000//maintenance')
    }
})

//Saves a new product to the MongoDb database. 
app.post('/api/newproduct', uploadEngine, async (req, res) => {
    const productData = new Products()
    for (i=0; i < req.body.size.length; i++) {
        const sizeObj = {
            sizeName: req.body.size[i],
            price: req.body.price[i] 
        }
        productData.size.push(sizeObj)
    }
    for (i=0; i < req.files.acc.length; i++) {
        const obj = {
            data: fs.readFileSync(req.files['acc'][i].path),
            contentType: req.files['acc'][i].mimetype
        }
        productData.accImgs.push(obj)
    }
    
    productData.name = req.body.name
    productData.desc = req.body.desc
    productData.category = req.body.category
    productData.mainImg.data = fs.readFileSync(req.files['main'][0].path)
    productData.mainImg.contentType = req.files['main'][0].mimetype

    try {
        productData.save()
        res.redirect('/maintenance')
    }
    catch(err) {
        res.send(err)
    }
})


//Deletes the selected database document matching the coresponding ID.
app.delete('/api/delete', async (req, res) => {
    prodId = req.body.prodId
    try {
        const dbResponse = await Products.findByIdAndRemove(prodId)
        console.log(dbResponse)
        res.json(dbResponse)
    } catch(err) {
        res.send({'status': `Error! ${err}`})
    }
})

//Updates the text portions of the products.  Determines if the data coming in will update an array element
//in the database or just a standard object.
app.put('/api/update/product_text', async (req, res) => {
    console.log(req.body)
    const query = { _id: req.body._id }
    const updateObj = {}
    const updateKey = req.body.updateKey
    if (updateKey === 'sizeName' || updateKey === 'price') {
        const updateString = `size.${req.body.position}.${updateKey}`
        updateObj[updateString] = req.body.updateValue
        console.log(updateObj)
    } else {
        updateObj[updateKey] = req.body.updateValue
    }
    try {
        const dbResponse = await Products.updateOne(query, updateObj)
        res.json({status: 'Great success'})
    } catch(err) {
        res.json({status: `Error! ${err}`})
    }
})

//Updates the image portions of the products.  Determines if the data coming in will update an array element
//in the database or just a standard object.
app.put('/api/update/image', upload.single('image'), async (req, res) => {
    const query = { _id: req.body._id }
    let updateData = {}
    let updateContentType = {}
    console.log(req.file)
    console.log(req.body)
    if (req.body.name === 'main') {
        updateData = { 'mainImg.data': fs.readFileSync(req.file.path) }
        updateContentType = { 'mainImg.contentType': req.file.mimetype }
    } else if (req.body.name === 'acc') {
        const dataString = `accImgs.${req.body.position}.data`
        const contentTypeString = `accImgs.${req.body.position}.contentType`
        updateData[dataString] = fs.readFileSync(req.file.path)
        updateContentType[contentTypeString] = req.file.mimetype
    }
    try {
        const dbResponse1 = await Products.updateOne(query, updateData)
        const dbResponse2 = await Products.updateOne(query, updateContentType)
        res.json({dbResponse1: dbResponse1, dbResponse2: dbResponse2})
    } catch(err) {
        res.json({status: `Error! ${err}`})
    }
})

const port = 5000
app.listen(process.env.PORT || port, () => console.log('Server Running'))