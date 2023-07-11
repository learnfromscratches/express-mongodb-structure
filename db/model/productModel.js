const mongoose = require("mongoose")

const schema = mongoose.Schema(
    {
       
        title : {
            type :String,
            required : [true, "A product must have id"],
            trim : true
        },
        description : {
            type : String,
            required : [true, "A product must have a description"]
        },
        mainImage : {
            type : String,
            required : [true, "A product must have a main image"]
        },
        images : {
            type : [String],
            required : [true, "A product must have sub images"]
        },
        category : {
            type : mongoose.Schema.ObjectId,
            ref : "Category"
        },
        seller : {
            type : mongoose.Schema.ObjectId,
            ref : "User"
        },
        price : {
            type : Number,
            required : [true, "Enter product price"],
            default : 0
        },
        priceAfterDiscount : {
            type : Number,
            required : true,
            default : 0
        },
        quantity : {
            type : Number,
            default : 0
        },
        brand : {
            type : String,
            required : true,
            trim : true
        },
        isOutOfStock : {
            type : Boolean,
            default : false
        }
    },{timestamp : true}
)

module.exports = mongoose.model('Product',schema)