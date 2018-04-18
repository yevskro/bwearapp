"use strict"
const pg = require("pg")
const tables = require("./tables")
const conString = "postgres://postgres:postgres@localhost:5432/postgres"
const dbName = `${process.argv[2] || process.env.db || 'beachwear'}`
const conDbString = `postgres://postgres:postgres@localhost:5432/${dbName}`

const client = new pg.Client(conString)

const handleError = (err, query) => {
    if(err){
        console.log(`error on query: ${query}`)
        console.log(err)
        client.end
        return true
    }
    return false
}

const dropDB = () => {
    client.query(`DROP DATABASE IF EXISTS ${dbName}`, (err, res) => {
        if(!handleError(err, `DROP DATABASE IF EXISTS ${dbName}`)){
            console.log("clean database...")
            createDB()
        }
    })
}

const createDB = () => {
    client.query(`CREATE DATABASE ${dbName}`, (err, res) => {
        if(!handleError(err, `CREATE DATABASE ${dbName}`)){
            const dbClient = new pg.Client(conDbString)
            dbClient.connect((err, res) => {
                if(!handleError(err))
                    createTables(dbClient, tables)
            })
        }
    })
}

const createTables = (db, tableQueries) => {
    if(tableQueries.length === 0){
        console.log(`created ${dbName} database.`)
        db.end()
        client.end()
        return
    }

    let tableName
    
    try{
        tableName = tableQueries[0].split(" TABLE ")[1].split(" (")[0]
    }
    catch(error){
        console.log("error: unsupported query by create.js check line 53 in create.js")
        db.end()
        client.end()
        return
    }

    db.query(tableQueries[0], (err, res) => {
        if(!handleError(err, tableQueries[0])){
            console.log("created table..." + tableName)
            tableQueries.shift()
            createTables(db, tableQueries)
        }
    })
}

client.connect((err, res) => {
    err ? console.log(err) : dropDB()
})

