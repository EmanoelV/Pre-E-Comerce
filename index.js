const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const routes = require('./app/controller/routes')
const app = express()
const port = 3000


app.set('view engine', "ejs")
app.set('views', path.join(__dirname,"app","view"))

app.use(express.static(path.join(__dirname,"public")))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(routes)

app.listen(port, () => {
    console.log('Servidor iniciado na porta '+port)
})