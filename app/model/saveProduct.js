function saveProduct(db,product) {
    let query = `INSERT INTO Product (Title,Value,Img) VALUES 
        ("${product.Title}", "${product.Value}", "${product.Img}");`
    db.run(query, (err) => {
        if(err) {
            return console.error(err.message)
        }
        console.log('Produto salvo')
    })
}

module.exports = saveProduct