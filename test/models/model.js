"use strict"
const expect = require('expect.js')
const pg = require("pg")
const conString = "postgres://postgres:postgres@localhost:5432/test"
const client = new pg.Client(conString)

before((done) => {
    client.connect((err, res) => {
        expect(err).to.equal(null)
        done()
    })  
})

describe('Model', () => {
    let Model, UserModel
    it('can be required and binded to a database', (done) => {
        Model = require('../../models/model')
        expect(Model).to.not.equal(null)
        UserModel = new Model(client, 'users', (err) => {
            expect(err).to.equal(null)
            done()
        })
        expect(UserModel).to.not.equal(null)
    })

    it('can query all', (done) => {
        UserModel.all((err, models) => {
            expect(err).to.equal(null)
            done()
        })
    }) 

    it('can find by an object properties', (done) => {
        UserModel.findBy({name: 'tehcoyote', email: 'email@email.com'}, (err, models) => {
            expect(err).to.equal(null)
            expect(models[0].user_id).to.equal(1)
            done()
        })
    })

    it('can find by an id', (done) => {
        UserModel.findById(2, (err, model) => {
            expect(err).to.equal(null)
            expect(model.user_id).to.equal(2)
            done()
        })
    })
    
    it('can create object', (done) => {
        UserModel.create({name: 'booya'}, (err, model) => {
          expect(err).to.equal(null)
          expect(model.name).to.equal('booya')  
          done()
        })
    })

    it('can delete', (done) => {
        UserModel.findBy({name: 'booya'}, (err, models) => {
            models[0].delete((err) => {
                expect(err).to.equal(null)
                done()
            })
        })
    })

    it('can update by an object properties', (done) => {
        UserModel.findById(2, (err, model) => {
            model.update({email: 'hello@gmail.com', phone_number: '2431236587'}, (err) => {
                expect(err).to.equal(null)
                done()
            })
        })
    })
})

after((done) => {
    client.end((err) => {
        expect(err).to.equal(undefined)
        done()
    })
})