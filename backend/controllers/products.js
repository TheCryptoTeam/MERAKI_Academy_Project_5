const connection =require('../db/db')

/////////////////////////////////////////////////////////////////////
//createNewProduct


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



//////////////////////////////////////////////////////////////////////////////
//getAllProducts



const getAllProducts = (req, res) => {
    const query=`SELECT * FROM products`
   
    connection.query(query,(err,result,field)=>{
     if (err){ 
         // throw err
     // console.log("errrrr",err);
         res.json({success:false,massege:"server erorr",err:err})
         res.status(500)
   
     }
     else{
         // console.log("result :",result);
     res.json({success:true,massege:"All the products",result:result})
     res.status(200)
   
     }
   })
       
   };



/////////////////////////////////////////////////////////////////////////////



    module.exports={
        createNewProduct,getAllProducts
    }