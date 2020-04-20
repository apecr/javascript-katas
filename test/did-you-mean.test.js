/* global describe, it */

const {
  Dictionary,
  getDistance,
  prepare,
  rotar,
  distance,
} = require('./../did-you-mean/did-you-mean')
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
  testDictionary({
    words: ['cherry', 'pineapple', 'melon', 'strawberry', 'raspberry'],
    expectations: [
      { query: 'strawbery', nearest: 'strawberry' },
      { query: 'berry', nearest: 'cherry' },
    ],
  })

  testDictionary({
    words: shuffle([
      'javascript',
      'java',
      'ruby',
      'php',
      'python',
      'coffeescript',
    ]),
    expectations: [
      { query: 'heaven', nearest: 'java' },
      { query: 'javascript', nearest: 'javascript' },
    ],
  })

  testDictionary({
    words: [
      'jcocndjkyb',
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
      'qojfrlhufr',
    ],
    expectations: [ { query: 'rkacypviuburk', nearest: 'zqdrhpviqslik' } ],
  })
})

describe('Distance between words', () => {
  it('Should get the distance between java and java2', () => {
    const distanceO = getDistance('java'.split(''), 'java2'.split(''))
    expect(distanceO.distance).to.be.equal(1)
  })
  it('Should get the distance between java and java21', () => {
    const distanceO = getDistance('java'.split(''), 'java22'.split(''))
    expect(distanceO.distance).to.be.equal(2)
  })
  it('Should get the distance between java22 and java', () => {
    const distanceO = getDistance('java22'.split(''), 'java'.split(''))
    expect(distanceO.distance).to.be.equal(2)
  })
  it('Should get the distance between java22 and java34', () => {
    const distanceO = getDistance('java22'.split(''), 'java34'.split(''))
    expect(distanceO.distance).to.be.equal(4)
  })
  it('Should get the distance between heaven and java', () => {
    const distanceO = getDistance('heaven'.split(''), 'java'.split(''))

    //console.log(distanceO)
    expect(distanceO.distance).to.be.equal(8)
  })
  it('Should get the distance between heaven and php', () => {
    const distanceO = getDistance('heaven'.split(''), 'php'.split(''))

    //console.log(distanceO)
    expect(distanceO.distance).to.be.equal(8)
  })
  it('Should get the distance between python and heaven', () => {
    const distanceO = distance('python', 'heaven')

    //console.log(distanceO)
    expect(distanceO).to.be.equal(9)
  })
  it('Should get the distance between php and heaven', () => {
    const distanceO = distance('php', 'heaven')

    //console.log(distanceO)
    expect(distanceO).to.be.equal(8)
  })
  it('Should get the distance between heaven and php', () => {
    const distanceO = distance('heaven', 'php')

    //console.log(distanceO)
    expect(distanceO).to.be.equal(8)
  })
  it('Should get the distance between java and heaven', () => {
    const distanceO = distance('java', 'heaven')

    //console.log(distanceO)
    expect(distanceO).to.be.equal(6)
  })
  it('Should get the distance between javascript and javascript', () => {
    const distanceO = distance('javascript', 'javascript')
    expect(distanceO).to.be.equal(0)
  })
  it('Should get the distance between java and javascript', () => {
    const distanceO = distance('java', 'javascript')
    expect(distanceO).to.be.equal(6)
  })
  it('Should get the distance between javascript and java', () => {
    const distanceO = distance('javascript', 'java')
    expect(distanceO).to.be.equal(6)
  })
})

describe('Should prepare the arrays', () => {
  it('Should prepare heaven and java', () => {
    const [ term ] = prepare('java', 'heaven')
    expect(term).to.be.deep.equal(['j', 'a', 'v', 'a', '1', '1'])
  })
  it('Should prepare heaven and python', () => {
    const [ term ] = prepare('python', 'heaven')
    expect(term).to.be.deep.equal('python'.split(''))
  })
  it('Should prepare heaveno and java', () => {
    const [ outWord ] = prepare('java', 'heaven0')
    expect(outWord).to.be.deep.equal(['j', 'a', 'v', 'a', '1', '1', '1'])
  })
  it('Should prepare php2 and java', () => {
    const [ outWord ] = prepare('php2', 'java')
    expect(outWord).to.be.deep.equal('php2'.split(''))
  })
})

describe('Rotar', () => {
  it('Rota 1', () => {
    const rotado = rotar([2, 3, 4])

    //console.log(rotado)
    expect(rotado).to.be.deep.equal([4, 2, 3])
  })
})
