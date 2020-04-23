/* global describe, it */
const { expect } = require('chai')
const RomanNumerals = require('./../roman-numerals-helper/roman')

const testArray = [
  {number: 1000, roman: 'M'},
  {number: 999, roman: 'CMXCIX'},

  {number: 4, roman: 'IV'},
  {number: 1, roman: 'I'},
  {number: 1991, roman: 'MCMXCI'},
  {number: 2006, roman: 'MMVI'},
  {number: 2020, roman: 'MMXX'},
  {number: 21, roman: 'XXI'},
  {number: 3, roman: 'III'},
  {number: 2007, roman: 'MMVII'},
  {number: 1669, roman: 'MDCLXIX'},
]

describe('Test number to roman', () => {
  testArray.forEach(element => {
    it(`Should get ${element.roman} from ${element.number}`, () => {
      expect(RomanNumerals.toRoman(element.number)).to.be.equal(element.roman)
    })
  })
})

describe('Test roman to number', () => {
  testArray.forEach(element => {
    it(`Should get ${element.number} from ${element.roman}`, () => {
      expect(RomanNumerals.fromRoman(element.roman)).to.be.equal(element.number)
    })
  })
})