"use strict"
const expect = require("expect.js")
const pg = require("pg")
const conString = "postgres://postgres:postgres@localhost:5432/test"
const client = new pg.Client(conString)

before((done) => {
    client.connect((err, res) => {
        expect(err).to.equal(null)
        done()
    })  
})

describe('items model', () => {
    let Model
    it('can be required and initiated', (done) => {
        Model = new (require('../../models/item'))(client, (err) => {
            expect(err).to.equal(null)
            done()
        })
        expect(Model).to.not.equal(null)
    })

    it('can be found by id', (done) => {
        Model.findById(1, (err, model) => {
            expect(err).to.equal(null)
            expect(model.name).to.equal('Bananas')
            done()
        })
    })
    it('can be found by object properties', (done) => {
        Model.findBy({price: 12.99, total_stock: 10}, (err, models) => {
            expect(err).to.equal(null)
            expect(models[0].name).to.equal('Bananas')
            done()
        })
    })
    
    it('can create', (done) => {
        Model.create({name: 'Shirt', price: 18.99 , total_stock: 10, shipping_price: 5.99},
            (err, model) => {
                expect(err).to.equal(null)
                expect(model.name).to.equal('Shirt')
                done()
            }
        )
    })

    it('it can update', (done) => {
        let ItemModel
        Model.findBy({name: 'Shirt'}, (err, models) => {
            ItemModel = models[0]
            expect(err).to.equal(null)
            expect(ItemModel.price).to.equal('18.99')
            ItemModel.update({price: 22.00}, (err) => {
                expect(err).to.equal(null)
                expect(ItemModel.price).to.equal('22.00')
                done()
            })
        })
    })

    it('it can persist votes', (done) => {
        let ItemModel
        Model.findBy({name: 'Shirt'}, (err, models) => {
            ItemModel = models[0]
            expect(err).to.equal(null)
            expect(ItemModel.price).to.equal('22.00')
            ItemModel.vote(5, (err) => {
                expect(err).to.equal(null)
                expect(ItemModel.votes).to.equal(1)
                expect(ItemModel.stars).to.equal('5.0')
                done()
            })
        })
    })

    it('it can delete', (done) => {
        Model.findBy({name: 'Shirt'}, (err, models) => {
            expect(err).to.equal(null)
            expect(models[0].price).to.equal('22.00')
            expect(models[0].delete((err) => {
                expect(err).to.equal(null)
                Model.findBy({name: 'Shirt'}, (err, models) => {
                    expect(err).to.equal(null)
                    expect(models.length).to.equal(0)
                    done()
                })
            }))
        })      
    })
})

after((done) => {
    client.end((err) => {
        expect(err).to.equal(undefined)
        done()
    })
})