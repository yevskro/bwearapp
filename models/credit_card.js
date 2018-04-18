"use strict"
const Model = require('./model')
const CreditCardModel = function(db, callback, objProperties){
    Model.call(this, db, "credit_cards", callback, objProperties)
}

CreditCardModel.prototype = Object.create(Model.prototype)
CreditCardModel.prototype.constructor = CreditCardModel

module.exports = CreditCardModel