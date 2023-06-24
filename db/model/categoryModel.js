const mongoose = require("mongoose")

const schema = mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
            trim : true
        },
        image : {
            type : String
        }
    },{timestamp : true}
)

module.exports = mongoose.model("Category",schema)