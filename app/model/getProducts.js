const { query } = require("express")
const { Database } = require("sqlite3")

async function getProducts(db) {
    let query = `
        SELECT * FROM Product ORDER BY Title
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

module.exports = getProducts