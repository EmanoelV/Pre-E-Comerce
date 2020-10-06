const express = require('express')
const routes = express.Router()
const db = require('../model/initDB')
const saveProduct = require('../model/saveProduct')
const multer = require('../model/multer')
const getProducts = require('../model/getProducts')

routes.get('/', async (req,res) => {
    let products = await getProducts(db)
    res.render('product',{products: products})
})

routes.get('/admin', (req,res) => {
    res.render('productForm')
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