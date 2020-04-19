function Dictionary(words) {
  this.words = words
}

const deletedLetters = (term, word) => {
  const termArray = term.split('')
  const wordArray = word.split('')
  let distance = 0
  let outArray = []
  let diff = []
  termArray.forEach(letterTerm => {
    if (!wordArray.includes(letterTerm)) {
      distance++
      diff.push(letterTerm)
    } else {
      wordArray.splice(wordArray.indexOf(letterTerm), 1)
      outArray.push(letterTerm)
    }
  })
  return {
    distance,
    in: term,
    word,
    diff: diff.join(''),
    out: outArray.join('')
  }
}

const includedLetters = (term, word) => {
  let distance = 0
  const termArray = term.split('')
  const wordArray = word.split('')
  let outArray = new Array(wordArray.length)
  let diff = []
  termArray.forEach((t, index) => {
    outArray.splice(index, 0, t)
  })
  wordArray.forEach((letterWord, index) => {
    if (termArray.includes(letterWord)) {
      termArray.splice(termArray.indexOf(letterWord), 1)
    } else {
      distance++
      outArray.splice(index, 0, letterWord)
      diff.push(letterWord)
    }
  })
  return {
    distance,
    in: term,
    word,
    diff: diff.join(''),
    out: outArray.join('')
  }
}

const replacedLetters = (term, word) => {
  let distance = 0
  const termArray = term.split('')
  const wordArray = word.split('')
  let diff = []
  termArray.forEach((termLetter, index) => {
    if (termLetter !== wordArray[index]) {
      distance++
      diff.push(termLetter)
    }
  })

  return {
    distance,
    in: term,
    word,
    diff: diff.join(''),
    out: word
  }
}

const distance = (term, word) => {
  const distanceDeleted = deletedLetters(term, word)
  console.log(distanceDeleted)
  const distanceIncluded = includedLetters(distanceDeleted.out, word)
  console.log(distanceIncluded)
  const distanceReplaced = replacedLetters(distanceIncluded.out, word)
  console.log(distanceReplaced)
  console.log(`Distance from ${term} to ${word}: `)
  console.log(distanceDeleted.distance + distanceIncluded.distance + distanceReplaced.distance)
  return distanceDeleted.distance + distanceIncluded.distance + distanceReplaced.distance
}

Dictionary.prototype.findMostSimilar = function(term) {
  const reduced = this.words.reduce((acc, word, index) => {
    const distan = distance(term, word)
    if (distan < acc.distance) {
      acc.distance = distan
      acc.index = index
      return acc
    }
    if (acc.index === -1) {
      acc.distance = distan
      acc.index = index
    }
    return acc
  }, {distance: 0, index: -1})
  return this.words[reduced.index]
}

module.exports = {Dictionary, deletedLetters, includedLetters, replacedLetters}