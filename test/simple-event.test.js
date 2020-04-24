/* global describe, it */
const {expect} = require('chai')
const Event = require('./../simple-events/event')

describe('Test events', () => {
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

    expect(f.calls).to.be.equal(1)//no second call
  })
})
