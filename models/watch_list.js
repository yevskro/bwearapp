"use strict"
const Model = require('./model')
const WatchListModel = function(db, callback, objProperties){
    Model.call(this, db, "watch_lists", callback, objProperties)
}

WatchListModel.prototype = Object.create(Model.prototype)
WatchListModel.prototype.constructor = WatchListModel

module.exports = WatchListModel