import _ from "lodash";

export const formatPerc = (value: number) => {
  let result = '-';
  if (value !== 0 && !_.isNull(value)) {
    result = `${(value * 100).toFixed(2)}%`;
  }
  return result
}