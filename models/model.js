const Model = function(db, table, callback, objProperties){
    this.db = db
    this.table = table

    if(objProperties === undefined){ // then we are creating an instance
        db.query(`SELECT a.attname FROM   pg_index i JOIN   pg_attribute a ON a.attrelid = i.indrelid
            AND a.attnum = ANY(i.indkey)
            WHERE  i.indrelid = '${table}'::regclass AND    i.indisprimary;`, 
            (err, res) => {
            this.primaryIdField = res.rows[0].attname
            callback(err)
        });
    }
    else {
        Object.keys(objProperties).forEach((next) => {
            this[next] = objProperties[next]
        })
    }
}

Model.convertObjForFindByQuery = function(obj){
    let keyArray = Object.keys(obj)
    let stopIndex = keyArray.length - 1
    return keyArray.reduce((prev, next, index) => {
        prev += `${next} = '${obj[next]}'`
        if(index !== stopIndex)
            prev += ' AND '
        return prev
    }, '')
}


Model.prototype.all = function(callback){
    this.db.query(`SELECT * FROM ${this.table}`, (err, res) => {
        let models
        if(err === null){
            let models = res.rows.map((row) => {
                return this.createInstance(row)
            })
        }
        callback(err, models)
    })
}

Model.prototype.findBy = function(obj, callback){
    this.db.query(`SELECT * FROM ${this.table} WHERE ${Model.convertObjForFindByQuery(obj)};`, (err, res) => {
        let models
        if(err === null){
            models = res.rows.map((row) => {
                return this.createInstance(row)
            })
        }
        callback(err, models)
    })
}

Model.prototype.findById = function(id, callback){
    this.db.query(`SELECT * FROM ${this.table} WHERE ${this.table}.${this.primaryIdField} = ${id};`, (err, res) => {
        let model
        if(err === null)
            model = this.createInstance(res.rows[0])
        callback(err, model)
    })
}

Model.prototype.createInstance = function(properties){
    if(this.constructor.name === 'Model')
        return new Model(this.db, this.table, null, Object.assign({}, properties, {primaryIdField: this.primaryIdField}))
    return new this.constructor(this.db, null, Object.assign({}, properties, {primaryIdField: this.primaryIdField}))
}

Model.convertObjForCreateQuery = function(obj){
    // converts obj to () VALUES ()
    let values = []
    let columns = Object.keys(obj).map((column) => {
        values.push(`'${obj[column]}'`)
        return `${column}`
    })
    return `(${columns.join(',')}) VALUES (${values.join(',')})`
}

Model.prototype.create = function(obj, callback){
    this.db.query(`INSERT INTO ${this.table} ${Model.convertObjForCreateQuery(obj)} RETURNING *;`, (err, res) => {
        let model
        if(err === null)
            model = this.createInstance(res.rows[0])
        callback(err, model)
    })
}

Model.convertObjForUpdateQuery = function(obj){
    let keyArray = Object.keys(obj)
    let stopIndex = keyArray.length - 1
    return keyArray.reduce((prev, next, index) => {
        prev += `${next} = '${obj[next]}'`
        if(index !== stopIndex)
            prev += ', '
        return prev
    }, '')
}
Model.prototype.update = function(obj, callback){
    this.db.query(`UPDATE ${this.table} SET ${Model.convertObjForUpdateQuery(obj)} WHERE ${this.primaryIdField} = ${this[this.primaryIdField]} RETURNING *;`, 
        (err, res) => {
            if(err === null)
                Object.assign(this, res.rows[0])
            callback(err)
        }
    )
}

Model.prototype.delete = function(callback){
    this.db.query(`DELETE FROM ${this.table} WHERE ${this.table}.${this.primaryIdField} = ${this[this.primaryIdField]};`, 
        (err, res) => {
            callback(err)
        }
    )
}

module.exports = Model