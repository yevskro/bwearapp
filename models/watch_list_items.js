"use strict"
const Model = require('./model')
const WatchListItemsModel = function(db, callback, objProperties){
    Model.call(this, db, "watch_list_items", callback, objProperties)
}

WatchListItemsModel.prototype = Object.create(Model.prototype)
WatchListItemsModel.prototype.constructor = WatchListItemsModel

module.exports = WatchListItemsModel