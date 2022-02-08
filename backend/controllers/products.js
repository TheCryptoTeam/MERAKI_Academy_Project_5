const connection = require('../db/db')

/////////////////////////////////////////////////////////////////////
//createNewProduct


const createNewProduct = (req, res) => {

    const query = `INSERT INTO products (name,type,image,brand,description,price) VALUES (?,?,?,?,?,?)`
    const data = [req.body.name, req.body.type, req.body.image, req.body.brand, req.body.description, req.body.price]

    connection.query(query, data, (err, result, field) => {
        if (err) {
            res.json({ success: false, massege: "server erorr", err: err })
            res.status(500)

        }
        else {
            res.status(201)
            res.json({ success: true, massege: "product craeted", result: result })


        }
    })
}



//////////////////////////////////////////////////////////////////////////////
//getAllProducts



const getAllProducts = (req, res) => {
    let skip = req.query.skip
    let limit = req.query.limit

    const query = `SELECT * FROM products WHERE is_deleted=0 LIMIT ${skip},${limit}  `

    connection.query(query, (err, result, field) => {
        if (err) {

            res.json({ success: false, massege: "server erorr", err: err })
            res.status(500)

        }
        else {
            res.json({ success: true, massege: "All the products", result: result })
            res.status(200)

        }
    })

};



/////////////////////////////////////////////////////////////////////////////
//getProductByName


const getProductByName = (req, res) => {

    const query = `SELECT * FROM products WHERE name=? AND is_deleted=0`;
    const productName = [req.query.name];


    connection.query(query, productName, (err, result, field) => {
        if (err) {

            res.json({ success: false, massege: "the product not found", err: err })
            res.status(404)

        }
        else {
            res.json({ success: true, massege: `the product `, products: result })
            res.status(200)

        }
    })
}




//////////////////////////////////////////////////////////////////////////////////////////////
//getProductBytype



const getProductByType = (req, res) => {

    const query = `SELECT * FROM products WHERE type=? AND is_deleted=0`;
    const productType = [req.params.type];


    connection.query(query, productType, (err, result, field) => {
        if (err) {

            res.json({ success: false, massege: "the product not found", err: err })
            res.status(404)

        }
        else {
            res.json({ success: true, massege: `the product ${productType}`, products: result })
            res.status(200)

        }
    })
}


////////////////////////////////////////////////////////////////////////////////////////////////////////
//getProductByBrand


const getProductByBrand = (req, res) => {

    const query = `SELECT * FROM products WHERE brand=? AND is_deleted=0`;
    const brand = req.params.brand


    connection.query(query, brand, (err, result, field) => {
        if (err) {

            res.json({ success: false, massege: "the product not found", err: err })
            res.status(404)

        }
        else {
            res.json({ success: true, massege: `the product ${brand}`, products: result })
            res.status(200)

        }
    })
}





/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//updateProductById




const updateProductById = (req, res) => {


    const query = `UPDATE products SET ? WHERE id=? AND is_deleted=0`
    const body = req.body
    const id = req.params.id
    const data = [body, id]

    connection.query(query, data, (err, result, field) => {
        if (err) {
            res.json(err)

        }
        else {
            res.json(result)

        }
    })
}


////////////////////////////////////////////////////////////////////////////////////
//deleteProductById



const deleteProductById = (req, res) => {

    const id = req.params.id;
    const query = `UPDATE products SET is_deleted=1 WHERE id=?;`

    connection.query(query, id, (err, result, field) => {
        if (err) {
            res.status(404)
            res.json({ success: false, massege: `The product: ${id} is not found` ,err:err})

        }
        else {
            res.status(200)
            res.json({ success: true, massege: `Succeeded to delete product with id: ${id}` })

        }
    })
}




/////////////////////////////////////////////////////////////////////////////////////////////////////////
//getProductById




const getProductById = (req, res) => {

    const query = `SELECT * FROM products WHERE id=?`
    const id = req.params.id
    connection.query(query, id, (err, result, field) => {
        if (err) {

            res.json({ success: false, massege: "the product not found", err: err })
            res.status(404)

        }
        else {
            res.json({ success: true, massege: `All the product id`, products: result })
            res.status(200)

        }
    })
}



///////////////////////////////////////////////////////////////////////////////////////
//module.exports


module.exports = {
    createNewProduct, getAllProducts, getProductByName,
    getProductByType, getProductByBrand, updateProductById,
    deleteProductById, getProductById
}