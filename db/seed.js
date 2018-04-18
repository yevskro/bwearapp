"use strict"
const pg = require('pg')
const seedQueries = require('./seeds')
const dbName = `${process.argv[2] || process.env.db || 'beachwear'}`
const conString = `postgres://postgres:postgres@localhost:5432/${dbName}`
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

const insertRows = (seedQueries) => {
    if(seedQueries.length === 0){
        console.log(`seeded ${dbName} database`)
        client.end()
        return
    }

    let tableName, values
    
    if(seedQueries[0].startsWith("INSERT")){
        tableName = seedQueries[0].split("INSERT INTO ")[1].split(" (")[0]
        values = seedQueries[0].split('VALUES\n    ')[1].split(',')[0] + ')'
    }
    else if(seedQueries[0].startsWith("UPDATE")){
        tableName = seedQueries[0].split("UPDATE ")[1].split(" ")[0]
        values = "UPDATE"  
    }
    else{
        console.log("error query not supported by seed.js check out line 33 in seed.js") 
        client.end()
        return
    }

    client.query(seedQueries[0], (err, res) => {
        if(!handleError(err, seedQueries[0])){
            console.log("seeded query..." + tableName + ' ' + values)
            seedQueries.shift()
            insertRows(seedQueries)
        }
    })
}


client.connect((err, res) => {
    err ? console.log(err) : insertRows(seedQueries)
})
