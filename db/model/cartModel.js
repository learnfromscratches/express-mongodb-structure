const mongoose = require("mongoose")

const schema = mongoose.Schema(
    {
        userId : {
            type : String,
            required : true,
            unique : true
        },
        items : []
    },
    { timestamps : true}
)

module.exports = mongoose.model("Cart",schema)