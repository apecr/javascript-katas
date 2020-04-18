/* global describe, it */

const Dictionary = require('./../did-you-mean/did-you-mean')
const expect = require('chai').expect

function testDictionary(spec) {
  var matcher = new Dictionary(spec.words)
  spec.expectations.forEach(function(e) {
    it('Creating a use case', () => {
      expect(matcher.findMostSimilar(e.query)).to.be.equal(e.nearest)
    })
  })
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

describe('Test the functions', () => {
  testDictionary({
    words: ['cherry', 'pineapple', 'melon', 'strawberry', 'raspberry'],
    expectations: [
      { query: 'strawbery',
        nearest: 'strawberry'
      },
      { query: 'berry',
        nearest: 'cherry'
      }
    ],
  })

  testDictionary({
    words: shuffle(['javascript', 'java', 'ruby', 'php', 'python', 'coffeescript']),
    expectations: [
      { query: 'heaven',
        nearest: 'java'
      },
      { query: 'javascript',
        nearest: 'javascript'
      }
    ],
  })
})
