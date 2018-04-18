"use strict"
const expect = require('expect.js');
const pg = require("pg")
const conString = "postgres://postgres:postgres@localhost:5432/test"
const client = new pg.Client(conString)

describe('Database Relations', () => {
  it('should be able to connect to a test db', (done) => {
    client.connect((err, res) => {
      expect(err).to.equal(null)
      done()
    })
  })
  it('users have an address, an address belongs to an user', (done) => {
    client.query("SELECT users.name, user_addresses.street_address FROM users INNER JOIN user_addresses ON (user_addresses.user_id = users.user_id);", (err, res) => {
      expect(err).to.equal(null)
      expect(res.rows[0].name).to.equal('tehcoyote')
      expect(res.rows[0].street_address).to.equal('2056 Graves Neck Rd')
      expect(res.rows[1].name).to.equal('durran')
      expect(res.rows[1].street_address).to.equal('333 Kentucky Drive')
      done()
    })
  })
  it('a user has a card, a card belongs to an user', (done) => {
    client.query('SELECT users.name, credit_cards.number FROM users INNER JOIN credit_cards ON (credit_cards.user_id = users.user_id);', (err, res) => {
      expect(err).to.equal(null)
      expect(res.rows[0].name).to.equal('tehcoyote')
      expect(res.rows[0].number).to.equal('2056205620562056')
      expect(res.rows[1].name).to.equal('durran')
      expect(res.rows[1].number).to.equal('3344334433443344') 
      done()     
    })
  })

  it('a card has an address, an address belongs to a card', (done) => {
    client.query(`SELECT credit_cards.number, card_addresses.street_address FROM credit_cards 
      INNER JOIN card_addresses ON (credit_cards.card_id = card_addresses.card_id);`, (err, res)=>{
      expect(err).to.equal(null)
      expect(res.rows[0].number).to.equal('2056205620562056')
      expect(res.rows[0].street_address).to.equal('2056 Graves Neck Rd')
      expect(res.rows[1].number).to.equal('3344334433443344')
      expect(res.rows[1].street_address).to.equal('333 Kentucky Drive') 
      done()             
    })
  })
  it('can close the database', (done) => {
    client.end((err) => {
      expect(err).to.equal(undefined)
      done()
    })
  })
})