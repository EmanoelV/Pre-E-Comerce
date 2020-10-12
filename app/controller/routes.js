const express = require('express')
const routes = express.Router()
const db = require('../model/initDB')
const saveProduct = require('../model/saveProduct')
const multer = require('../model/multer')
const getProducts = require('../model/getAllProducts')
//const addInCart = require('../model/addInCart')
//const countInCart = require('../model/countInCart')
const getOneProducts = require('../model/getOneProduct')
//const getAllInCart = require('../model/getAllInCart')
//const clearCart = require('../model/clear-cart')
const Cart = require('../model/cart')
const cart = new Cart(db)


//GET
routes.get('/', async (req,res) => {
    let valueCart = await cart.count()
    valueCart = valueCart[0]['COUNT(ProductId)']
    let products = await getProducts(db)
    res.render('product',{products: products, valueCart})
})

routes.get('/admin', async (req,res) => {
    let valueCart = await cart.count()
    valueCart = valueCart[0]['COUNT(ProductId)']
    res.render('productForm', {valueCart})
})

routes.get('/cart', async (req,res) => {
    let productIds = await cart.readAll()
    let valueCart = await cart.count()
    valueCart = valueCart[0]['COUNT(ProductId)']
    let productsInCart = []

    for (const key in productIds) {
        if (productIds.hasOwnProperty(key)) {
            productsInCart.push(await getOneProducts(db,productIds[key].ProductId))
        }
    }

    res.render('cart', {products: productsInCart, valueCart})
})

routes.get('/clear-cart', (req,res) => {
    cart.clear()
    res.redirect('cart')
})



//POST
routes.post('/add_in_cart', async (req,res) => {
    try {
        await cart.add(req.query.id)
        res.end()
    } catch (error) {
        console.error(error)
        res.status(500).end()
    }
    
    
})

routes.post('/admin', multer.single('Img'), (req,res) => {
    if(req.file) {
        console.log("Imagem armazenada")
        req.body.Img = req.file.filename
        saveProduct(db,req.body)
        return res.redirect('/admin')
    }
    
    res.send('Oopps!!! ocorreu um erro, o programador ficou com preguiça de tratar esse erro, sorry')
})

module.exports = routes