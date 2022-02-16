const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./db/db");
const path = require("path");

const app = express();

//built-in middleware
app.use(express.json());
app.use(cors());

// Import Routers
const usersRouter = require("./routes/users");
const rolesRouter = require("./routes/roles");
const productsRouter = require("./routes/products");
const loginRouter = require("./routes/login");
const cartsRouter = require("./routes/carts");
const wishListRouter = require("./routes/wishList");
const commentsRouter = require("./routes/comments");

const stripe = require("./routes/stripe");



if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
}
// app.get('*',(req, res) => {
//   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
// });


// Routes Middleware
app.use("/users", usersRouter);
app.use("/roles", rolesRouter);
app.use("/products", productsRouter);
app.use("/login", loginRouter);
app.use("/carts", cartsRouter);
app.use("/wishList", wishListRouter);
app.use(commentsRouter);
const PORT = process.env.PORT || 5000;
app.use("/payment", stripe);


app.use("*","not found")
app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
