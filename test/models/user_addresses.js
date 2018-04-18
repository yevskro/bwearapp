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

describe('user_addresses model', () => {
    let UserAddressModel
    it('can be required and initiated', (done) => {
        UserAddressModel = new (require('../../models/user_addresses'))(client, (err) => {
            expect(err).to.equal(null)
            done()
        })
        expect(UserAddressModel).to.not.equal(null)
    })
    it('can be found by id', (done) => {
        UserAddressModel.findById(1, (err, model) => {
            expect(err).to.equal(null)
            expect(model.state).to.equal('New York')
            done()
        })
    })
    it('can be found by object properties', (done) => {
        UserAddressModel.findBy({zipcode: '11223', city: 'Brooklyn'}, (err, models) => {
            expect(err).to.equal(null)
            expect(models[0].state).to.equal('New York')
            done()
        })
    })
    it('can create', (done) => {
        UserAddressModel.create({zipcode: '14354', city: 'Dragon', state: 'Cave', street_address: '64 Goldmine Ave.,'},
            (err, model) => {
                expect(err).to.equal(null)
                expect(model.city).to.equal('Dragon')
                done()
            }
        )
    })
    it('it can update', (done) => {
        let UAModel
        UserAddressModel.findBy({city: 'Dragon'}, (err, models) => {
            UAModel = models[0]
            expect(err).to.equal(null)
            expect(UAModel.state).to.equal('Cave')
            UAModel.update({city: 'Nogard', state: 'Avec'}, (err) => {
                expect(err).to.equal(null)
                expect(UAModel.city).to.equal('Nogard')
                expect(UAModel.state).to.equal('Avec')
                done()
            })
        })
    })
    it('it can delete', (done) => {
        UserAddressModel.findBy({city: 'Nogard'}, (err, models) => {
            expect(err).to.equal(null)
            expect(models[0].state).to.equal('Avec')
            expect(models[0].delete((err) => {
                expect(err).to.equal(null)
                UserAddressModel.findBy({city: 'Nogard'}, (err, models) => {
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