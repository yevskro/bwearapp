"use strict"
const Model = require('./model')
const ItemModel = function(db, callback, objProperties){
    Model.call(this, db, "items", callback, objProperties)
    this.categories = {shirt: 1, shorts: 2, footwear: 3, hats: 4, sunglasses: 5, miscellaneous: 6}
    this.target = {women: 1, girls: 2, men: 3, boys: 4}
}

ItemModel.prototype = Object.create(Model.prototype)
ItemModel.prototype.constructor = ItemModel
ItemModel.prototype.vote = function(starPoints, callback){
    if(!this.votes){
        this.votes = 0
        this.points = 0
        this.starts = 0
    }

    this.votes++
    this.points += starPoints
    this.stars = this.points / (this.votes * 5) * 5
    this.update({votes: this.votes, points: this.points, stars: this.stars}, callback)
}

module.exports = ItemModel