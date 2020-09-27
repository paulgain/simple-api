const proxyquire = require('proxyquire')
const sinon = require('sinon')
const nock = require('nock')
const chai = require('chai')
const sinonChai = require('sinon-chai')

const config = require('./api/config/index')

chai.use(sinonChai)

global.expect = chai.expect
global.sinon = sinon
global.proxyquire = proxyquire
global.nock = nock
global.rootPath = `${process.cwd()}`

module.exports = {
  ui: 'bdd',
}
