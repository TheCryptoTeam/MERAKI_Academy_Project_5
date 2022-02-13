const connection = require("../db/db");

const createNewRateing = (req, res) => {
    const productId = req.params.id;
    const userId = req.token.userId;
    
    const { rating } = req.body;
  
    const query = `INSERT INTO ratings (rating , user_id, product_id) VALUES (?,?,?)`;
    const data = [rating, userId, productId];
  
    connection.query(query, data, (err, results) => {
      if (err) {
        return res.status(404).json({
          success: false,
          massage: "something went wrong while creating a new Rateing",
          err: err,
        });
      }
    
      
      res.status(201).json({
        success: true,
        massage: "The Rateing has been created success ",
        results: results,
      });
    });
  };

  const getRatings = (req, res) => {
    const query = `SELECT * FROM ratings WHERE product_id=? AND is_deleted=0`;
    const productID = [req.params.id];
  
    connection.query(query, productID, (err, result, field) => {
      if (err) {
        res.json({ success: false, massege: "the rating not found", err: err });
        res.status(404);
      } else {
        res.json({ success: true, massege: `the ratings `,results: result });
        res.status(200);
      }
    });
  };

  

  module.exports = {
    createNewRateing,
    getRatings,
    
  };
  