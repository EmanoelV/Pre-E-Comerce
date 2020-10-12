class Cart {
    constructor(db) {
        this.db = db
        this.query
    }

    #load = (resolve, reject) => {
        this.db.all(this.query, [], (error,data) => {
            if (error) {
                reject(error)
            } else {
                resolve(data)
            }
        })
    }

    add(productId) {
        this.query = `INSERT INTO Cart (ProductId) VALUES ("${productId}");`
        return new Promise(this.#load)
    }

    clear() {
        this.query = "DELETE FROM Cart; VACUUM;";
        return new Promise(this.#load)
    }

    count() {
        this.query = `SELECT COUNT(ProductId) FROM Cart;`
        return new Promise(this.#load)
    }

    readAll() {
        this.query = `SELECT * FROM Cart;`
        return new Promise(this.#load)
    }
}

module.exports = Cart