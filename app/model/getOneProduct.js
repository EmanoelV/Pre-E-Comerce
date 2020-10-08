async function getOneProducts(db, id) {
    let query = `
        SELECT * FROM Product WHERE id == ${id};
    `

    // Cria uma promisse para poder ser aguardado com o await em sua chamada
    const load = (resolve, reject) => {
        db.all(query, [], (err,data) => {
            if(err) {
                reject(console.error(err))
            }
            resolve(data[0])
        })
    }

    return new Promise(load)
}

module.exports = getOneProducts