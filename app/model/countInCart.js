module.exports = function countInCart(db) {
    const query = `SELECT COUNT(ProductId) FROM Cart;`

    const load = (resolve, reject) => {
        db.all(query, [], (err,data) => {
            if(err) {
                reject(console.error(err))
            }
            let value = data[0]['COUNT(ProductId)']
            resolve(value)
        })
    }

    return new Promise(load)
}