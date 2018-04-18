"use strict"
const Model = require('./model')
const StarModel = function(db, callback, objProperties){
    Model.call(this, db, "carts", callback, objProperties)
}

CartModel.prototype = Object.create(Model.prototype)
CartModel.prototype.constructor = CartModel

module.exports = CartModel