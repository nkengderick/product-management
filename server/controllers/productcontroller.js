const Product = require('../models/Product')

const createProduct = async (req, res) => {
    try {
        
        const { id, name, imageUrl, price, category, quantity } = req.body
        
        const existingProduct = await Product.findOne({id});
        if (existingProduct) {
            return res.status(409).json({ message: "Product with ID already exists." });
          }
          
        const product = new Product({ id, name, imageUrl, price, category, quantity })
        await product.save()

        res.status(200)
        res.json({message: 'Product added successfully'})

    }   catch(error){
        console.error(error)
        res.status(500)
        res.json({message: 'Error creating Product.'})
    } 
}

const getProductById = async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findOne({id})
        if(!product) {
            res.status(404)
            res.json({ message: 'Product not found' })
        } else {
            res.status(200)
            res.json({ product })
        }
    } catch(error) {
        console.error(error)
        res.status(500)
        res.json({ message: `Error fetching product` })
    }
}

const getProductByName = async (req, res) => {
    try {
        const {name} = req.params
        const product = await Product.findOne({name: name})
        if(!product) {
            res.status(404)
            res.json({ message: 'Product not found' })
        } else {
            res.status(200)
            res.json({ product })
        }
    } catch(error) {
        console.error(error)
        res.status(500)
        res.json({ message: `Error fetching product` })
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200)
        if(products.length === 0){
            res.json({message: 'No Products Found'})
        } else {
            res.json({ products })
        }
    } catch(error) {
        console.error(error)
        res.status(500)
        res.json({message: 'Error fetching products.'})
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params 
        const deletedProduct = await Product.findOneAndDelete({id})
        if (!deletedProduct) {
            res.json({ message: 'Product not found.' });
            res.status(404)
        } else{
            res.json({ message: 'Product Successfully Deleted' })
            res.status(204)
        }
    } catch (error) {
        console.error(error)
        res.status(500)
        res.json({message: 'Error Deleting Product'})
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { name, price, imageUrl, category, quantity } = req.body
        const updatedProduct = await Product.findOneAndUpdate({ id: id}, { name, price, imageUrl, category, quantity }, {new: true})
        if (!updatedProduct) {
            res.json({ message: 'Product not found.' });
            res.status(404)
        } else {
            res.status(200)
            res.json({message: 'Product Successfully Updated' })
        }
    } catch(error) {
        console.error(error)
        res.status(500)
        res.json({message: 'Error updating product.'})
    }
}

const createRandomProducts = async (req, res) => {
    try {
        
        const getRandomCategory = () => {
            const categoryNumber = Math.floor(Math.random() * 10) + 1
            return `category${categoryNumber}`
        }

        const getRandomQuantity = () => {
            const quantity = Math.floor(Math.random() * 10) + 4
            return `${quantity}`
        }

        const getRandomImageUrl = () => {
            const randomId = Math.floor(Math.random() * 1000)
            return `https://picsum.photos/200/300?random=${randomId}`
        }

        for (let i = 1; i <= 500; i++) {
            const randomProduct = new Product({
                id: i,
                name: `Product ${i}`,
                price: Math.floor(Math.random() * 1000) + 1,
                category: getRandomCategory(),
                imageUrl: getRandomImageUrl(),
                quantity: getRandomQuantity(),
            })

            const product = await randomProduct.save()
            console.log(`Random Product ${product.id} created`)
        }

        res.status(200)
        res.json({message: '500 Random Products added'})

    } catch(error) {
        console.error(error)
        res.status(500)
        res.json({ message: "Error Saving random products"})
    }
}


module.exports = { getProductByName, createProduct, getProductById, deleteProduct, getProducts, updateProduct, createRandomProducts }

