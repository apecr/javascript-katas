const units = {
  0: { u: 'I', u5: 'V', u10: 'X' },
  1: { u: 'X', u5: 'L', u10: 'C' },
  2: { u: 'C', u5: 'D', u10: 'M' },
  3: { u: 'M', u5: 'M', u10: 'M' },
}

const getGeneralTransform = (unitPosition) => {
  const { u, u5, u10 } = units[unitPosition]
  return {
    0: '',
    1: u,
    2: `${u}${u}`,
    3: `${u}${u}${u}`,
    4: `${u}${u5}`,
    5: u5,
    6: `${u5}${u}`,
    7: `${u5}${u}${u}`,
    8: `${u5}${u}${u}${u}`,
    9: `${u}${u10}`,
  }
}

const getRomanFromNumberUnit = (number, unitPosition) => {
  return getGeneralTransform(unitPosition)[number]
}

const RomanNumerals = {
  toRoman: (number) => {
    return number
      .toString()
      .split('')
      .reverse()
      .reduce(
        (acc, numberS, index) =>
          `${getRomanFromNumberUnit(+numberS, index)}${acc}`,
        ''
      )
  },
  fromRoman: (roman) => {
    const romanArrayReversed = roman.split('').reverse()
    let number = 0
    let unit = 0
    let agrupation = undefined
    for (let i = 0; i < romanArrayReversed.length + 1; i++) {
      const element = romanArrayReversed[i]
      if (units[unit]) {
        if (element === units[unit].u || element === units[unit].u5) {
          agrupation = agrupation ? element + agrupation : element
        } else if (i < romanArrayReversed.length && element === units[unit].u10 && romanArrayReversed[i + 1] === units[unit].u) {
          agrupation = element
        } else {
          const generalTransform = getGeneralTransform(unit)
          const numberForAgrupation = Object.keys(generalTransform).filter((key) => generalTransform[key] === agrupation)[0]
          const totalAgrupation = numberForAgrupation ? numberForAgrupation * Math.pow(10, unit) : 0
          agrupation = undefined
          unit++
          i--
          number += totalAgrupation
        }
      }
    }
    return number
  },
}

module.exports = RomanNumerals
