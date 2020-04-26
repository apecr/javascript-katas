/* global describe, it */
const { expect } = require('chai')
const Event = require('./../advanced-events/event')

describe('Test events (simple tests)', () => {
  it('Shuould subscribe and unsubscribe', () => {
    var event = new Event()

    function f() {
      f.calls = (f.calls || 0) + 1
      f.args = Array.prototype.slice.call(arguments)
    }

    event.subscribe(f)
    event.emit(1, 'foo', true)

    expect(f.calls).to.be.equal(1) // calls a handler
    expect(f.args).to.be.deep.equal([1, 'foo', true]) // passes arguments

    event.unsubscribe(f)
    event.emit(2)

    expect(f.calls).to.be.equal(1) //no second call
  })
})

describe('Should exist an advanced event', () => {
  it('Should have a .subscribe() and .unsubscribe method', () => {
    const e = new Event()
    expect(e.subscribe).to.be.a('function')
    expect(e.unsubscribe).to.be.a('function')
  })
  describe('Should accept invalid parameters', () => {
    const f1 = (arr) => (arr.push(1))
    const f2 = (arr) => (arr.push(2))
    it('Should accept not functions parameters in subscribe', () => {
      const e = new Event()
      e.subscribe(f1, f2, undefined)
      const arrTest = []
      e.emit(arrTest)
      expect(arrTest).to.be.deep.equal([1, 2])
    })
    it('Should accept not functions parameters in unsubscribe', () => {
      const e = new Event()
      e.subscribe(f1, f2, undefined)
      const arrTest = []
      e.emit(arrTest)
      e.unsubscribe(null, f2)
      e.emit(arrTest)
      expect(arrTest).to.be.deep.equal([1, 2, 1])
    })
    it('multiple subscriptions of the same handler allowed', () => {
      const e = new Event()
      e.subscribe(f1, f2, f1, f1)
      let arrTest = []
      e.emit(arrTest)
      expect(arrTest).to.be.deep.equal([1, 2, 1, 1])
      e.unsubscribe(f1)
      arrTest = []
      e.emit(arrTest)
      expect(arrTest).to.be.deep.equal([1, 2, 1])
    })
  })
})

describe('Test events (advanced tests)', () => {
  it('Shuould subscribe and unsubscribe', () => {
    function l(arr) {
      arr.push('l')
    }
    function o(arr) {
      arr.push('o')
    }

    var e = new Event()
    var bucket = []

    e.subscribe(l, o, l)
    e.emit(bucket)

    //bucket should be ['l', 'o', 'l']
    expect(bucket).to.be.deep.equal(['l', 'o', 'l'])

    e.unsubscribe(o, l)
    bucket = []

    e.emit(bucket) //bucket should be ['l']

    expect(bucket).to.be.deep.equal([ 'l' ])
  })
})
