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

describe('card_addresses model', () => {
    let CardAddressModel
    it('can be required and initiated', (done) => {
        CardAddressModel = new (require('../../models/card_addresses'))(client, (err) => {
            expect(err).to.equal(null)
            done()
        })
        expect(CardAddressModel).to.not.equal(null)
    })
    it('can be found by id', (done) => {
        CardAddressModel.findById(1, (err, model) => {
            expect(err).to.equal(null)
            expect(model.state).to.equal('New York')
            done()
        })
    })
    it('can be found by object properties', (done) => {
        CardAddressModel.findBy({zipcode: '11223', city: 'Brooklyn'}, (err, models) => {
            expect(err).to.equal(null)
            expect(models[0].state).to.equal('New York')
            done()
        })
    })
    it('can create', (done) => {
        CardAddressModel.create({zipcode: '14354', city: 'Dragon', state: 'Cave', street_address: '64 Goldmine Ave.,'},
            (err, model) => {
                expect(err).to.equal(null)
                expect(model.city).to.equal('Dragon')
                done()
            }
        )
    })
    it('it can update', (done) => {
        let CAModel
        CardAddressModel.findBy({city: 'Dragon'}, (err, models) => {
            CAModel = models[0]
            expect(err).to.equal(null)
            expect(CAModel.state).to.equal('Cave')
            CAModel.update({city: 'Nogard', state: 'Avec'}, (err) => {
                expect(err).to.equal(null)
                expect(CAModel.city).to.equal('Nogard')
                expect(CAModel.state).to.equal('Avec')
                done()
            })
        })
    })
    it('it can delete', (done) => {
        CardAddressModel.findBy({city: 'Nogard'}, (err, models) => {
            expect(err).to.equal(null)
            expect(models[0].state).to.equal('Avec')
            expect(models[0].delete((err) => {
                expect(err).to.equal(null)
                CardAddressModel.findBy({city: 'Nogard'}, (err, models) => {
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