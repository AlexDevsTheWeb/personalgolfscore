export const formatPerc = (value: number) => {
  let result = '-';
  if (value !== 0) {
    result = `${(value * 100).toFixed(2)}%`;
  }
  return result
}