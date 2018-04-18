"use strict"
const Model = require('./model')
const CardAddressModel = function(db, callback, objProperties){
    Model.call(this, db, "card_addresses", callback, objProperties)
}

CardAddressModel.prototype = Object.create(Model.prototype)
CardAddressModel.prototype.constructor = CardAddressModel

module.exports = CardAddressModel
