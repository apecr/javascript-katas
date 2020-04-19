function Dictionary(words) {
  this.words = words
}

const deletedLetters = (term, word) => {
  const termArray = term.split('')
  const wordArray = word.split('')
  let distance = 0
  let outArray = []
  termArray.forEach(letterTerm => {
    if (!wordArray.includes(letterTerm)) {
      distance++
    } else {
      wordArray.splice(wordArray.indexOf(letterTerm), 1)
      outArray.push(letterTerm)
    }
  })
  return {
    distance,
    out: outArray.join('')
  }
}

const includedLetters = (term, word) => {
  let outArray = []
  let distance = 0
  const termArray = term.split('')
  const wordArray = word.split('')
  wordArray.forEach(letterWord => {
    if (termArray.includes(letterWord)) {
      termArray.splice(termArray.indexOf(letterWord), 1)
    } else {
      distance++
    }
    outArray.push(letterWord)
  })
  return {
    distance,
    out: outArray.join('')
  }
}

const replacedLetters = (term, word) => {
  let distance = 0
  const termArray = term.split('')
  const wordArray = word.split('')
  termArray.forEach((termLetter, index) => {
    if (termLetter !== wordArray[index]) {
      distance++
    }
  })

  return {
    distance,
    out: word
  }
}

const distance = (term, word) => {
  const distanceDeleted = deletedLetters(term, word)
  const distanceIncluded = includedLetters(distanceDeleted.out, word)
  const distanceReplaced = replacedLetters(distanceIncluded.out, word)
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