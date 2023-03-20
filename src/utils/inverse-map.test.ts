import { inverseMap } from './inverse-map'

describe('When given an object', () => {
  test('should reverse the keys with the values', () => {
    const inputVal = new Map([
      ['A', 10],
      ['B', 11],
      ['C', 12],
    ])

    const outputVal = new Map([
      [10, 'A'],
      [11, 'B'],
      [12, 'C'],
    ])
    expect(inverseMap<string, number>(inputVal)).toEqual(outputVal)
  })
})
