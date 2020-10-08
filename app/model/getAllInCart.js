async function getAllInCart(db) {
    let query = `
        SELECT * FROM Cart;
    `
    // Cria uma promisse para poder ser aguardado com o await em sua chamada
    const load = (resolve, reject) => {
        db.all(query, [], (err,data) => {
            if(err) {
                reject(console.error(err))
            }
            resolve(data)
        })
    }

    return new Promise(load)
}

module.exports = getAllInCart