import Chai from 'chai'
import ChaiHTTP from 'chai-http'
import { response } from 'express'
import { describe, it as test } from 'mocha'
import application from '../Server.js'

Chai.should()
Chai.use(ChaiHTTP)

const testingNonExistingRoute = () => {
  describe('testingNonExistingRoute', () => {
    test('HTTP call againt a route that does not exist in the API', done => {
      Chai.request(application)
        .get('/nonexistingrouteblablabla')
        .end((request, response) => {
          response.should.have.a.status(404)
          done()
        })
    })
  })
}

describe('TESTING THE USER API ENTITY', () => {
  testingNonExistingRoute()
})