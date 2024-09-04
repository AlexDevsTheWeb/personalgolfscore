
export const iAmintheZone = (start: number, finish: number, shots: number) => {
  let iAmintheZone = false;

  if (start === 0 && finish !== 0) {
    iAmintheZone = Number(shots) > finish;
  }
  if (start !== 0 && finish === 0) {
    iAmintheZone = Number(shots) <= start;
  }
  if (start !== 0 && finish !== 0) {
    iAmintheZone = (Number(shots) > start) && (Number(shots) <= finish);
  }

  return iAmintheZone;
}

export const divide = (first: number, second: number) => {

  let result = 0;

  const what = `first: ${first} / second: ${second} -> result: ${result}`;
  console.log(what);
  console.log("------------");

  if (first !== 0 && (second !== 0 || second !== 0.00)) {
    result = first / second;
  }



  return result
}