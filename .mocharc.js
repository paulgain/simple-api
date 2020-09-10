const proxyquire = require('proxyquire')
const chai = require('chai')
const sinon = require('sinon')
const nock = require('nock')

chai.use(require('sinon-chai'))

global.expect = chai.expect
global.sinon = sinon
global.proxyquire = proxyquire
global.nock = nock
global.rootPath = `${process.cwd()}`

module.exports = {
  ui: 'bdd',
  spec: 'test/unit/**/*.test.js',
}
