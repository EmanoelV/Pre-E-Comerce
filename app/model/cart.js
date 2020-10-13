const LoadQuery = require("./load-query");

class Cart extends LoadQuery {
    constructor(db, query) {
        super(db,query)
    }

    add(productId) {
        this.query = `INSERT INTO Cart (ProductId) VALUES ("${productId}");`
        return new Promise(this.load)
    }

    clear() {
        this.query = "DELETE FROM Cart; VACUUM;";
        return new Promise(this.load)
    }

    count() {
        this.query = `SELECT COUNT(ProductId) FROM Cart;`
        this.param = 'COUNT(ProductId)'
        return new Promise(this.load)
    }

    readAll() {
        this.query = `SELECT * FROM Cart;`
        return new Promise(this.load)
    }

    remove(id) {
        this.query = `DELETE FROM Cart WHERE ProductId = ${id}; VACUUM;`
        return new Promise(this.load)
    }
}

module.exports = Cart