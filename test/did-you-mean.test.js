/* global describe, it */

const {Dictionary, deletedLetters, includedLetters, replacedLetters} = require('./../did-you-mean/did-you-mean')
const expect = require('chai').expect

function testDictionary(spec) {
  var matcher = new Dictionary(spec.words)
  spec.expectations.forEach(function(e) {
    it(`Creating a use case for ${JSON.stringify(e)}`, () => {
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
//   testDictionary({
//     words: ['cherry', 'pineapple', 'melon', 'strawberry', 'raspberry'],
//     expectations: [
//       { query: 'strawbery',
//         nearest: 'strawberry'
//       },
//       { query: 'berry',
//         nearest: 'cherry'
//       }
//     ],
//   })

  //   testDictionary({
  //     words: shuffle(['javascript', 'java', 'ruby', 'php', 'python', 'coffeescript']),
  //     expectations: [
  //       { query: 'heaven',
  //         nearest: 'java'
  //       },
  //       { query: 'javascript',
  //         nearest: 'javascript'
  //       }
  //     ],
  //   })

  testDictionary({
    words: ['jcocndjkyb',
      'ntwmwwmicnjvhtt',
      'jhjyasikwyufr',
      'ggcvrtxrtnafw',
      'hwzsemiqxjwfk',
      'hkldhadcxrjbmkmcdi',
      'kqijoorfkejdcxr',
      'npyrgrpbdfqhhncdi',
      'ljxzjjorwgb',
      'hrwuhmtxxvmygb',
      'lnjhrzfrosinb',
      'clxmqmiycvidiyr',
      'mhmkakybpczjbb',
      'xikoctmrhpvi',
      'nnsoamjkrzgldi',
      'eglanhfredaykxr',
      'ppctybxgtleipb',
      'cfvruditwcxr',
      'qifwqgdsijibor',
      'znystgvifufptxr',
      'hirldidcuzbyb',
      'dihhiczkdwiofpr',
      'riyhpvimgaliuxr',
      'vkholxrvjwisrk',
      'karpscdigdvucfr',
      'ucxmdeudiycokfnb',
      'dyhxgviphoptak',
      'pdyjrkaylryr',
      'xuwahveztwoor',
      'osbednerciaai',
      'fgtrjakzlnaebxr',
      'tdvibqccxr',
      'zqdrhpviqslik',
      'tklquxrnhfiggb',
      'afirbipbmkamjzw',
      'cpnqknjyviusknmte',
      'fxpvfhfrujjaifr',
      'iqkyztorburjgiudi',
      'loogviwcojxgvi',
      'iroezmixmberfr',
      'emvquxrvvlvwvsi',
      'sefsknopiffajor',
      'fxjskybblljqr',
      'psaysnhfrrqgxwik',
      'pxyousorusjxxbt',
      'xrgdgqfrldwk',
      'cwhyyzaorpvtnlfr',
      'ajacizfrgxfumzpvi',
      'xffrkbdyjveb',
      'qojfrlhufr'],
    expectations: [
      { query: 'rkacypviuburk',
        nearest: 'zqdrhpviqslik'
      }
    ],
  })
})


describe.skip('Calculate the number of words that you have to delete', () => {
  it('heaven to java delete 4 letters to delete', () => {
    console.log(deletedLetters('heaven', 'java'))
    expect(deletedLetters('heaven', 'java').distance).to.be.equal(4)
  })
  it('javascript to javascript delete 0 letters to delete', () => {
    expect(deletedLetters('javascript', 'javascript').distance).to.be.equal(0)
    console.log(deletedLetters('javascript', 'javascript'))
  })
  it('strawbery to strawbery delete 0 letters to delete', () => {
    expect(deletedLetters('strawbery', 'strawbery').distance).to.be.equal(0)
    console.log(deletedLetters('strawbery', 'strawbery'))
  })

  describe('Included letters', () => {
    it('av to java 2 letters to include', () => {
      const included = includedLetters('av', 'java')
      console.log(included)
      expect(included.distance).to.be.equal(2)
    })
    it('javascript to javascript delete 0 letters to delete', () => {
      const included = includedLetters('javascript', 'javascript')
      console.log(included)
      expect(included.distance).to.be.equal(0)
    })
    it('strawbery to strawbery delete 0 letters to delete', () => {
      const included = includedLetters('strawbery', 'strawbery')
      console.log(included)
      expect(included.distance).to.be.equal(0)
    })
  })

  describe('Replaced letters', () => {
    it('aavj to java 2 letters to replace', () => {
      const replaced = replacedLetters('aavj', 'java')
      console.log(replaced)
      expect(replaced.distance).to.be.equal(2)
    })
    it('javascript to javascript replace 0 letters to delete', () => {
      const replaced = replacedLetters('javascript', 'javascript')
      console.log(replaced)
      expect(replaced.distance).to.be.equal(0)
    })
    it('strawbery to strawbery replace 0 letters to delete', () => {
      const replaced = replacedLetters('strawbery', 'strawbery')
      console.log(replaced)
      expect(replaced.distance).to.be.equal(0)
    })
  })
})
