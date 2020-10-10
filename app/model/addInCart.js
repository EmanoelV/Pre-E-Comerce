module.exports = function addInCart(db, productId) {
    let query = `INSERT INTO Cart (ProductId) VALUES ("${productId}");`

    const load = (resolve, reject) => {
        db.all(query, [], (err,data) => {
            if(err) {
                reject(err)
            }
            resolve()
        })
    }

    return new Promise(load)
}