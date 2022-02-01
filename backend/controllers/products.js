const connection =require('../db/db')


const createNewProduct = (req, res) => {

    const query=`INSERT INTO products (name,type,image,brand,description,price) VALUES (?,?,?,?,?,?)`
    const data=[req.body.name,req.body.type,req.body.image,req.body.brand,req.body.description,req.body.price]
  
    connection.query(query,data,(err,result,field)=>{
      if (err){ 
          // throw err
          res.json({success:false,massege:"server erorr",err:err})
          res.status(500)
    
      }
      else{
          // console.log("result :",result);
      res.status(201)
      res.json({success:true,massege:"product craeted",result:result})
  
    
      }
    })}

    module.exports={
        createNewProduct
    }