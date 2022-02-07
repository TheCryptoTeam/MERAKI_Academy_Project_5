const connection = require("../db/db");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const createNewAuthor = async (req, res) => {
  console.log(req.body);
  const { userName, email, password, role_id } = req.body;
  let encryptedPassword;
  if (password) {
    encryptedPassword = await bcrypt.hash(password, saltRounds);
    
  }
console.log(encryptedPassword);
  const query = `INSERT INTO users ( userName,email, password, role_id) VALUES (?,?,?,?)`;
  const data = [userName, email, encryptedPassword, role_id];
  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(409).json({
        success: false,
        massage: "The email already exists",
        err: err,
      });
    }
    // result are the data returned by mysql server
    res.status(200).json({
      success: true,
      massage: "Success user Added",
      results: results,
    });
  });
};

module.exports = {
  createNewAuthor,
};
