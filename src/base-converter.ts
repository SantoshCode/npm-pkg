import { LettersToNumberMap } from './constants/letters-to-number-map'
import { inverseMap } from './utils/inverse-map'

export class BaseConverter {
  private numbersToLettersMap
  private DELIMITER = '.'
  constructor() {
    this.numbersToLettersMap = inverseMap<string, number>(LettersToNumberMap)
  }
  private validateNumberInBaseN(numberToConvert: string, baseFrom: number): void {
    if (typeof numberToConvert !== 'string') throw new Error('Number to convert must be a string')
    if (typeof baseFrom !== 'number') throw new Error('Base from needs to be a number')

    if (numberToConvert.split(this.DELIMITER).length > 2) {
      throw new Error('Number contains more than one delimiter')
    }

    const digits = Array.from(numberToConvert).filter((digit) => digit !== this.DELIMITER)
    for (const digit of digits) {
      const digitAsNumber = this.getDigitAsNumber(digit)
      if (typeof digitAsNumber === 'undefined' || digitAsNumber >= baseFrom) {
        throw new Error('Invalid number')
      }
    }
  }
  convertFromBaseNToDecimal(numberToConvert: string, baseFrom: number): number {
    this.validateNumberInBaseN(numberToConvert, baseFrom)
    // 1101 (binary i.e base 2) -> 2^3 * 1 + 2^2 * 1 + 2^1 * 0 + 2^0 * 1 = 13
    // 1101 (base 3) -> 3^3 * 1 + 3^2 * 1 + 3^1 * 0 + 3^0 * 1
    const digitsArray = Array.from(numberToConvert)
    const decimalIndex = digitsArray.indexOf(this.DELIMITER)
    if (decimalIndex !== -1) {
      digitsArray.splice(decimalIndex, 1)
    }

    const digitsLength =
      decimalIndex !== -1 ? digitsArray.length - (digitsArray.length - decimalIndex) : digitsArray.length
    const result = digitsArray.reduce((accumulatedValue: number, currentValue: string, currentIndex: number) => {
      return (
        accumulatedValue + Math.pow(baseFrom, digitsLength - currentIndex - 1) * this.getDigitAsNumber(currentValue)!
      )
    }, 0)
    return result
  }
  convertFromDecimalToBaseN(numberToConvert: number, baseTo: number): string {
    let result = []
    while (true) {
      const remainder = numberToConvert % baseTo
      result.push(`${this.numbersToLettersMap.get(remainder) || remainder}`)
      numberToConvert = Math.floor(numberToConvert / baseTo)

      if (numberToConvert < baseTo) {
        result.push(`${this.numbersToLettersMap.get(numberToConvert) || numberToConvert}`)
        break
      }
    }
    while (result.slice(-1)[0] === '0' && result.length !== 1) {
      result.pop()
    }
    return result.reverse().join('')
  }
  private getDigitAsNumber(digit: string) {
    let result: number | undefined = parseInt(digit)
    if (isNaN(result)) {
      result = LettersToNumberMap.get(digit)
    }
    return result
  }
}
