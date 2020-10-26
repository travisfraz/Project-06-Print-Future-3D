const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    mainImg: {
        data: Buffer,
        contentType: String
    },
    accImgs: [{
        data: Buffer,
        contentType: String,
    }]
})

module.exports = mongoose.model('Products', productSchema)