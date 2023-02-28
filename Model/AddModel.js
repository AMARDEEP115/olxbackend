const mongoose=require("mongoose");

const productSchema=mongoose.Schema({
	name : String,
	description : String,
	category : String,
	image : String,
	location : String,
	postedAt : String,
	price : Number
});

const productModel=mongoose.model("products",productSchema);

module.exports=productModel;