const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    size: [{
        _id: false,
        sizeName: String,
        price: Number,
    }],
    desc: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    mainImg: {
        data: Buffer,
        contentType: String
    },
    accImgs: [{
        _id: false,
        data: Buffer,
        contentType: String,
    }]
})

module.exports = mongoose.model('Products', productSchema)