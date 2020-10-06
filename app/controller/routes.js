const express = require('express')
const routes = express.Router()
const db = require('../model/initDB')
const saveProduct = require('../model/saveProduct')
const multer = require('../model/multer')
const getProducts = require('../model/getProducts')
const addInCart = require('../model/addInCart')
const countInCart = require('../view/components/countInCart')

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
routes.get('/add_in_cart', async (req,res) => {
    addInCart(db, req.query.id)
    res.redirect('/')
})

//POST
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