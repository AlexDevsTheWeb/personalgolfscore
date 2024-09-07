export const formatPerc = (value: number) => {
  console.log("value: ", value)
  let result = '-';
  if (value !== 0) {
    result = `${(value * 100).toFixed(2)}%`;
  }
  return result
}