const express = require('express')
const routes = express.Router()
const db = require('../model/initDB')
const multer = require('../model/multer')
const Cart = require('../model/cart')
const Product = require('../model/product')

const product = new Product(db)
const cart = new Cart(db)


//GET
routes.get('/', async (req,res) => {
    let valueCart = await cart.count()
    let products = await product.readAll()
    res.render('product',{products: products, valueCart})
})

routes.get('/admin', async (req,res) => {
    let valueCart = await cart.count()
    res.render('productForm', {valueCart})
})

routes.get('/cart', async (req,res) => {
    let productIds = await cart.readAll()
    let valueCart = await cart.count()
    let productsInCart = []

    for (const key in productIds) {
        if (productIds.hasOwnProperty(key)) {
            productsInCart.push(await product.read(productIds[key].ProductId))
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

routes.post('/remove-cart', async (req,res) => {
    await cart.remove(req.body.id)
    res.redirect('cart')
})

routes.post('/admin', multer.single('Img'), (req,res) => {
    if(req.file) {
        console.log("Imagem armazenada")
        req.body.Img = req.file.filename
        product.create(req.body)
        return res.redirect('/admin')
    }
    
    res.send('Oopps!!! ocorreu um erro, o programador ficou com preguiça de tratar esse erro, sorry')
})

module.exports = routes