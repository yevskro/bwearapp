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

describe('user model', () => {
    let Model
    it('can be required and initiated', (done) => {
        Model = new (require('../../models/user'))(client, (err) => {
            expect(err).to.equal(null)
            done()
        })
        expect(Model).to.not.equal(null)
    })

    it('can be found by id', (done) => {
        Model.findById(1, (err, model) => {
            expect(err).to.equal(null)
            expect(model.name).to.equal('tehcoyote')
            done()
        })
    })
    it('can be found by object properties', (done) => {
        Model.findBy({name: 'tehcoyote'}, (err, models) => {
            expect(err).to.equal(null)
            expect(models[0].name).to.equal('tehcoyote')
            done()
        })
    })
    
    it('can create', (done) => {
        Model.create({name: 'boo', password: 'dfdfd'},
            (err, model) => {
                expect(err).to.equal(null)
                expect(model.name).to.equal('boo')
                done()
            }
        )
    })

    it('it can update', (done) => {
        let User
        Model.findBy({name: 'boo'}, (err, models) => {
            User = models[0]
            expect(err).to.equal(null)
            expect(User.name).to.equal('boo')
            User.update({name: 'doo'}, (err) => {
                expect(err).to.equal(null)
                expect(User.name).to.equal('doo')
                done()
            })
        })
    })
    it('it can delete', (done) => {
        Model.findBy({name: 'doo'}, (err, models) => {
            expect(err).to.equal(null)
            expect(models[0].name).to.equal('doo')
            expect(models[0].delete((err) => {
                expect(err).to.equal(null)
                Model.findBy({name: 'doo'}, (err, models) => {
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