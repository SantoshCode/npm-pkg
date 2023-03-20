// export const inverseObject = (obj: Record<string, unknown>): Record<string, unknown> => {
//   // const keyValuePairArray = Object.entries(obj)
//   // const reverseKeyValuePairArray = keyValuePairArray.map((item) => item.reverse() as [string, unknown])
//   // return Object.assign({}, ...reverseKeyValuePairArray.map((item) => ({ [item[0]]: item[1] })))

//   const initialValue: Record<string, unknown> = {}
//   return Object.keys(obj).reduce((accumulator: Record<string, unknown>, currentValue: string) => {
//     accumulator[obj[currentValue] as string] = currentValue
//     return accumulator
//   }, initialValue)
// }
export const inverseMap = <K, V>(mapObj: Map<K, V>) => {
  // const keyValuePairArray = Object.entries(obj)
  // const reverseKeyValuePairArray = keyValuePairArray.map((item) => item.reverse() as [string, unknown])
  // return Object.assign({}, ...reverseKeyValuePairArray.map((item) => ({ [item[0]]: item[1] })))
  return new Map(Array.from(mapObj).map((item) => item.reverse() as [V, K]))
}
