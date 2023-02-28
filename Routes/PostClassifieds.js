const { Router } = require("express");
const productModel = require("../Model/AddModel");



const olxRouter=Router();

olxRouter.get("/",async(req,res)=>{
    let query=req.query;
    let data=await productModel.find();
    if(query.category!==undefined || query.sort!==undefined || query.name!==undefined || query.limit!==undefined || query.page!==undefined){
        if(query.category!==undefined){
            data=data.filter((el)=>el.category===query.category);
        }
        if(query.sort!==undefined){
            if(query.sort==="desc"){
                data=data.sort((a,b)=>{
                    return new Date(b.postedAt) - new Date(a.postedAt);
                });
            } else {
                data=data.sort((a,b)=>{
                    return new Date(a.postedAt) - new Date(b.postedAt);
                });
            }
        }
        if(query.name!==undefined){
            data=data.filter((el)=>el.name.toLowerCase().includes(query.name.toLowerCase()));
        }
        let ans=[];
        if(query.page!==undefined){
            let p=Number(query.page)-1;
            let x=4*p;
            for(let i=x;i<(x+4);i++){
                if(data[i]!==undefined){
                    ans.push(data[i]);
                }
            }
        } else {
            for(let i=0;i<4;i++){
                if(data[i]!==undefined){
                    ans.push(data[i]);
                }
            }
        }
        res.send({"data":ans});
    } else {
        let ans=[];
        for(let i=0;i<4;i++){
            if(data[i]!==undefined){
                ans.push(data[i]);
            }
        }
        res.send({"data":ans});
    }
});

olxRouter.post("/add",async(req,res)=>{
    let data=req.body;
    let dataa=new productModel(data);
    await dataa.save();
    res.send({"msg":"product added"});
});

olxRouter.delete("/remove/:id",async(req,res)=>{
    let ID=req.params.id;
    let dataa=await productModel.findByIdAndDelete({_id:ID});
    res.send({"msg":"product deleted"});
});


module.exports=olxRouter;