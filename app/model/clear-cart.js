

module.exports = function clearCart(db) {
    let query = "DELETE FROM Cart; VACUUM;";

    const load = (resolve, reject) => {
        db.all(query, [], (err,data) => {
            if(err) {
                reject(console.error(err))
            }
            resolve(true)
        })
    }

    return new Promise(load)
}