const sqlite3 = require('sqlite3').verbose()

let db = new sqlite3.Database('dataBase.db', (err) => {
    if(err) {
        return console.error(err.message)
    }
    console.log('Conectado ao banco de dados')
})

module.exports = db