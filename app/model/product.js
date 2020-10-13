const LoadQuery = require("./load-query");

class Product extends LoadQuery {
    constructor(db, query) {
        super(db,query)
    }

    readAll() {
        this.query = `SELECT * FROM Product ORDER BY Title`
        return new Promise(this.load)
    }

    read(id) {
        this.query = `SELECT * FROM Product WHERE id == ${id};`
        this.param = 0
        return new Promise(this.load)
    }

    create(product) {
        this.query = `INSERT INTO Product (Title,Value,Img) VALUES 
            ("${product.Title}", "${product.Value}", "${product.Img}");`
        return new Promise(this.load)
    }
}

module.exports = Product