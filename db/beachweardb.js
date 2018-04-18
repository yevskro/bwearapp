// connects the database and sets models as database properties
"use strict"
const pg = require('pg')
const conString = "postgres://postgres:postgres@localhost:5432/test"
const db = new pg.Client(conString)
const connectModels = require('../models/connectdb')

function connect(success){
    db.connect((err, res) => {
        if(err)
            console.log(err)
        else{
            connectModels(err => {
                if(err)
                    console.log(err)
                else{
                    console.log("BeachwearDB connected.")
                    success()
                }
            }, db)
        }
    })
    return db
}

module.exports = connect