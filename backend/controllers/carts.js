const connection = require("../db/db");

//addTOCart

const addTOCart = (req, res) => {
  const user_id = req.token.userId;
  const product_id = req.params.id;
  const { quantity } = req.body;
  const data = [user_id, product_id, quantity];
  const query = `INSERT INTO carts (user_id, product_id, quantity) VALUES (?,?,?)`;
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(404).json({
        success: false,
        massage: "something went wrong while Adding to carts",
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
  addTOCart,
};
