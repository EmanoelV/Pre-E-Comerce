const { param } = require("../controller/routes")

class LoadQuery {
    constructor(db) {
        this.db = db
        this.query
        this.param
    }

    load = (resolve, reject) => {
        this.db.all(this.query, [], (error,data) => {
            if (error) {
                reject(error)
            } else {
                if(typeof this.param != "undefined") {
                    //Para casos em que se retorna apenas um valor no array de maps
                    data = this.param == 0 ? data[0] : data[0][this.param]
                }
                this.param = undefined
                resolve(data)
                
            }
        })
    }
}

module.exports = LoadQuery