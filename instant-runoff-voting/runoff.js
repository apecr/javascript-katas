const getAllCandidates = (listVoterVallots) => {
  return listVoterVallots.reduce((acc, element) => {
    acc = acc.concat(element)
    return acc.filter((item, index) => acc.indexOf(item) === index)
  }, [])
}

const evaluateFirstCandidates = (listVoterBallots, allCandidates) => {
  return allCandidates.reduce(
    (acc, candidate) => {
      if (!(candidate in acc)) {
        acc[candidate] = 0
      }
      return acc
    },
    listVoterBallots.reduce((acc, element) => {
      if (element[0] in acc) {
        acc[element[0]]++
        return acc
      }
      acc[element[0]] = 1
      return acc
    }, {})
  )
}

const getMaxAndMin = (firstCandidates, allCandidates) => {
  const arrayForEvaluation = Object.keys(firstCandidates).map(
    (e) => firstCandidates[e]
  )
  const min = Math.min(...arrayForEvaluation)
  const max = Math.max(...arrayForEvaluation)
  return {
    max: {
      elements: Object.keys(firstCandidates).filter(
        (key) => firstCandidates[key] === max
      ),
      value: max,
    },
    min: {
      elements: Object.keys(firstCandidates).filter(
        (key) => firstCandidates[key] === min
      ),
      value: min,
    },
  }
}

const winner = (max, numVoters) => max.value > numVoters / 2

const runoff = (listVoterBallots) => {
  let listFunction = [ ...listVoterBallots ]
  const numElements = listFunction[0].length
  for (let i = 0; i < numElements; i++) {
    const allCandidates = getAllCandidates(listFunction)
    const firstCandidates = evaluateFirstCandidates(
      listFunction,
      allCandidates
    )
    const { max, min } = getMaxAndMin(firstCandidates, allCandidates)
    if (winner(max, listFunction.length)) {
      return max.elements[0] === 'undefined' ? undefined : max.elements[0]
    }
    listFunction = listFunction.map((voter) =>
      voter.filter((e) => !min.elements.includes(e))
    )
  }
}

module.exports = runoff
