"use strict"
const Model = require('./model')
const UserAddressModel = function(db, callback, objProperties){
    Model.call(this, db, "card_addresses", callback, objProperties)
}

UserAddressModel.prototype = Object.create(Model.prototype)
UserAddressModel.prototype.constructor = UserAddressModel

module.exports = UserAddressModel