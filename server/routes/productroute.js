const express = require('express');
const router = express.Router();

const { createProduct, getProductById, getProducts, updateProduct, deleteProduct, createRandomProducts, getProductByName } = require('../controllers/productcontroller')

router.route('/products')
    .get(getProducts)
    .post(createProduct)
    
router.route('/product/id:id')
    .get(getProductById)
    .delete(deleteProduct)
    .put(updateProduct)
    
router.route('/product/name:name')
    .get(getProductByName)

router.route('/products/random')
    .post(createRandomProducts)
     
module.exports = router