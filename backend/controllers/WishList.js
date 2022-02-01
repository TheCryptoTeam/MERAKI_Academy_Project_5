const connection = require("../db/db");

//addToWishList

const addToWishList = (req, res) => {
  const user_id = req.token.userId;
  const product_id = req.params.id;
  const data = [user_id, product_id];
  const query = `INSERT INTO wishList (user_id, product_id) VALUES (?,?)`;
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(404).json({
        success: false,
        massage: "something went wrong while Adding to wishList",
        err: err,
      });
    }

    res.status(201).json({
      success: true,
      massage: "Product added successfully ",
      result: result,
    });
  });
};


//====================================

//GetMyWishList

const GetMyWishList = (req, res) => {
    const query = `SELECT * FROM wishList WHERE is_deleted=0;`;
  
    connection.query(query, (err, result) => {
      if (!result.length) {
        res.status(500).json({
          success: false,
          massage: "The wishList is empty",
          err: err,
        });
      }
  
      res.status(200).json({
        success: true,
        massage: "All the wishList Products",
        results: result,
      });
    });
  };

module.exports = {
  addToWishList,
  GetMyWishList,
};
