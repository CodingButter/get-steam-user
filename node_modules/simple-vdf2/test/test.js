/* eslint-env mocha */
'use strict'

const VDF = require('../index.js')
require('chai').should()

let testData

describe('simple-vdf2', function () {
  beforeEach(function () {
    testData = '"Root"\n{\n\t"Key"\t\t"Value"\n}'
  })

  afterEach(function () {
    testData = null
  })

  describe('#parse(text)', function () {
    it('should throw an error for a non-string argument', function parseThrowsForNonString () {
      function testThis () {
        try {
          VDF.parse({'greet': 'Hello, VDF!'})
        } catch (err) {
          throw new Error(err)
        }
      }

      testThis.should.throw()
    })

    it('should throw an error for open parentheses', function parseThrowsForOpenParens () {
      function testThis () {
        try {
          VDF.parse(testData + '{\n"and then"\t\t"everyone died. The end."\n}')
        } catch (err) {
          throw new Error(err)
        }
      }

      testThis.should.throw()
    })

    it.skip('should throw an error for invalid brackets', function parseThrowsForBrackets () {
      try {
        VDF.parse('"Hello"\n{\t\t\n}')

        throw new Error('Did not fail.')
      } catch (err) {
        if (err.message.indexOf('VDF.parse: expected bracket on line') === -1) {
          throw new Error(err)
        }
      }
    })

    it('should throw an error for invalid syntax', function parseThrowsForInvalid () {
      try {
        VDF.parse('Hi {\t\t}}')

        throw new Error('Did not fail.')
      } catch (err) {
        if (err.message.indexOf('VDF.parse: invalid syntax on line') === -1) {
          throw new Error(err)
        }
      }
    })

    it('should return an object for a valid string', function parseWorks () {
      let val = VDF.parse(testData)

      val.should.be.a('object').and.have.property('Root')
    })
  })

  describe('#stringify(obj, pretty)', function () {
    it('should throw an error for an invalid argument', function stringifyThrowsForInvalidArg () {
      function testThis () {
        try {
          let val = VDF.stringify(testData)

          val.should.be.a('string')
        } catch (err) {
          throw new Error(err)
        }
      }

      testThis.should.throw()
    })

    it.skip('should throw an error for an invalid key', function stringifyThrowsForInvalidKey () {
      function testThis () {
        try {
          testData = VDF.parse(testData)
          Object.defineProperty(testData, 2, Object.create(null))

          throw new Error('Did not fail.')
        } catch (err) {
          if (err.message.indexOf('invalid key') === -1) {
            throw new Error(err)
          }
        }
      }

      testThis.should.throw()
    })

    it('should return a string from a valid obj argument', function stringifyWorks () {
      let val = VDF.stringify(VDF.parse(testData))

      val.should.be.a('string')
    })
  })
})
