const express = require('express')
const routes = express.Router()
const db = require('../model/initDB')
const saveProduct = require('../model/saveProduct')
const multer = require('../model/multer')
const getProducts = require('../model/getAllProducts')
const addInCart = require('../model/addInCart')
const countInCart = require('../view/components/countInCart')
const getOneProducts = require('../model/getOneProduct')
const getAllInCart = require('../model/getAllInCart')

//GET
routes.get('/', async (req,res) => {
    let valueCart = await countInCart(db)
    let products = await getProducts(db)
    res.render('product',{products: products, valueCart})
})

routes.get('/admin', async (req,res) => {
    let valueCart = await countInCart(db)
    res.render('productForm', {valueCart})
})

routes.get('/cart', async (req,res) => {
    let productIds = await getAllInCart(db)
    let valueCart = await countInCart(db)
    let productsInCart = []

    for (const key in productIds) {
        if (productIds.hasOwnProperty(key)) {
            productsInCart.push(await getOneProducts(db,productIds[key].ProductId))
        }
    }

    res.render('cart', {products: productsInCart, valueCart})
})

routes.get('/clear-cart', (req,res) => {
    //"DELETE FROM produtos VACUUM"
    res.send('em desenvolvimento, paciencia')
})



//POST
routes.post('/add_in_cart', async (req,res) => {
    await addInCart(db, req.query.id)
    res.end()
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