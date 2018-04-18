"use strict"
module.exports = function connect(err, db){
            db.User = new (require('../models/user'))(db, (error) => {
                if(error)
                    err('Error connecting to User model.')
                else{
                    err(null)
                }
            })
        }