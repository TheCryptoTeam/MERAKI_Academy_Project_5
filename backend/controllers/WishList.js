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
module.exports = {
  addToWishList,
};
