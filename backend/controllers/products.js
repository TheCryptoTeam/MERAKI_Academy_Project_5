const connection =require('../db/db')

/////////////////////////////////////////////////////////////////////
//createNewProduct


const createNewProduct = (req, res) => {

    const query=`INSERT INTO products (name,type,image,brand,description,price) VALUES (?,?,?,?,?,?)`
    const data=[req.body.name,req.body.type,req.body.image,req.body.brand,req.body.description,req.body.price]
  
    connection.query(query,data,(err,result,field)=>{
      if (err){ 
          res.json({success:false,massege:"server erorr",err:err})
          res.status(500)
    
      }
      else{
      res.status(201)
      res.json({success:true,massege:"product craeted",result:result})
  
    
      }
    })}



//////////////////////////////////////////////////////////////////////////////
//getAllProducts



const getAllProducts = (req, res) => {
    const query=`SELECT * FROM products WHERE is_deleted=0 `
   
    connection.query(query,(err,result,field)=>{
     if (err){ 
  
         res.json({success:false,massege:"server erorr",err:err})
         res.status(500)
   
     }
     else{
     res.json({success:true,massege:"All the products",result:result})
     res.status(200)
   
     }
   })
       
   };



/////////////////////////////////////////////////////////////////////////////
//getProductByName


const getProductByName = (req, res) => {

    const query=`SELECT * FROM products WHERE name=? AND is_deleted=0`;
    const productName=[req.query.name];
  
  
    connection.query(query,productName,(err,result,field)=>{
      if (err){ 
     
          res.json({success:false,massege:"the product not found",err:err})
          res.status(404)
    
      }
      else{
      res.json({success:true,massege:`the product `,products:result})
      res.status(200)
    
      }
    })}




//////////////////////////////////////////////////////////////////////////////////////////////
//getProductBytype



const getProductByType = (req, res) => {

    const query=`SELECT * FROM products WHERE type=? AND is_deleted=0`;
    const producType=[req.query.type];
  
  
    connection.query(query,producType,(err,result,field)=>{
      if (err){ 
    
          res.json({success:false,massege:"the product not found",err:err})
          res.status(404)
    
      }
      else{
      res.json({success:true,massege:`the product ${productName}`,products:result})
      res.status(200)
    
      }
    })}



    module.exports={
        createNewProduct,getAllProducts,getProductByName,getProductByType
    }