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

const getMyCart = (req, res) => {
  const query = `SELECT * FROM carts WHERE is_deleted=0;`;

  connection.query(query, (err, result) => {
    if (!result.length) {
      res.status(500).json({
        success: false,
        massage: "The cart is empty",
        err: err,
      });
    }

    res.status(200).json({
      success: true,
      massage: "All the cart Products",
      results: result,
    });
  });
};

const deleteFromMyCart = (req, res) => {
  const id = req.params.id;

  const query = `UPDATE carts SET is_deleted=1 WHERE id=?;`;

  const data = [id];

  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }
    if (!results.changedRows) {
      return res.status(404).json({
        success: false,
        massage: `The cart: ${id} is not found`,
        err: err,
      });
    }

    res.status(200).json({
      success: true,
      massage: `Succeeded to delete cart with id: ${id}`,
      results: results,
    });
  });
};

module.exports = {
  addTOCart,
  getMyCart,
  deleteFromMyCart
};
