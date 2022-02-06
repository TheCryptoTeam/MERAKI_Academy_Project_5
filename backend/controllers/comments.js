const connection = require("../db/db");

const createNewComment = (req, res) => {
  const productId = req.params.product_id;
  console.log(req.params);
  const commenter_id = req.token.userId;
  const { comment } = req.body;

  const query = `INSERT INTO comments (comment, commenter_id, product_id) VALUES (?,?,?)`;
  const data = [comment, commenter_id, productId];

  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(404).json({
        success: false,
        massage: "something went wrong while creating a new comment",
        err: err,
      });
    }
    // result are the data returned by mysql server
    res.status(201).json({
      success: true,
      massage: "The comment has been created success ",
      results: results,
    });
  });
};



//get all comment 



const getAllComment = (req, res) => {
  const query = `SELECT * FROM comments WHERE product_id=? AND is_deleted=0`;
  const productID = [req.params.product_id];
console.log(productID);

  connection.query(query,productID, (err, result, field) => {
      if (err) {

          res.json({ success: false, massege: "the product not found", err: err })
          res.status(404)

      }
      else {
          res.json({ success: true, massege: `the product `, products: result })
          res.status(200)

      }
  })
};


module.exports = {
  createNewComment,
  getAllComment
};
