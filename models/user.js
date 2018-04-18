"use strict"
const Model = require('./model')
const bcrypt = require('bcrypt')
const UserModel = function(db, callback, objProperties){
    Model.call(this, db, "users", callback, objProperties)
}

UserModel.prototype = Object.create(Model.prototype)
UserModel.prototype.constructor = UserModel
UserModel.prototype.validateBeforeCreate = function(obj, errorFn){
    if(obj.email.length === 0 || obj.password.length === 0){
        errorFn('Empty email or password.')
    }
    else if(obj.password.length < 7){
        errorFn('Password is too short. Minimum 7 characters.')
    }
    else errorFn(null)
}

UserModel.prototype.signIn = function(objCredentials, callback){
    this.findBy({email: objCredentials.email}, (err, users) => {
        if(users.length === 0){
            callback('Email not found.')
        }
        else {
            if(!bcrypt.compareSync(objCredentials.password, users[0].password))
                callback('Wrong password.')
            else
                callback(null, users[0].user_id, users[0].role)
        }
    })
}

UserModel.prototype.signUp = function(objCredentials, callback){
    this.validateBeforeCreate({email: objCredentials.email, password: objCredentials.password}, (err) => {
        if(err){
            callback(err)
        }
        else{
            const salt = bcrypt.genSaltSync()
            const password = bcrypt.hashSync(objCredentials.password, salt)
            this.create({email: objCredentials.email, password: objCredentials.password, role: 1}, (err, user) => {
                if(err !== null){
                    if(err.code === '23505')
                        callback('Account with that email already exists.')
                }
                else{
                    callback(null, user.user_id, user.role)
                }
            })
        }
    })
}

module.exports = UserModel