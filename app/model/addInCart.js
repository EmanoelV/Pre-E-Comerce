module.exports = function addInCart(db, productId) {
    let query = `INSERT INTO Cart (ProductId) VALUES ("${productId}");`

    db.run(query, (err) => {
        if(err) {
            return console.error(err.message)
        }
        console.log('Produto salvo')
    })
}