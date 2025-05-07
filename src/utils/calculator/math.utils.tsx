// /Users/abstract/CODE/personal/personalgolfscore/src/utils/math/math.utils.ts

/**
 * Safely divides two numbers and returns the result with a specified precision.
 * Handles division by zero, NaN, or Infinity by returning 0.
 *
 * @param numerator The number to be divided.
 * @param denominator The number to divide by.
 * @param precision The number of decimal places for the result. Defaults to 2.
 * @returns The result of the division as a number, or 0 if invalid.
 */
export const safeDivide = (numerator: number | undefined, denominator: number | undefined, precision: number = 2): number => {
  const num = numerator || 0;
  const den = denominator || 0;

  if (den === 0) {
    return 0;
  }
  const result = num / den;
  if (isNaN(result) || !isFinite(result)) {
    return 0;
  }
  return parseFloat(result.toFixed(precision));
};

/**
 * Safely calculates a percentage and returns the result with a specified precision.
 * Handles division by zero, NaN, or Infinity by returning 0.
 *
 * @param numerator The numerator for the percentage calculation.
 * @param denominator The denominator for the percentage calculation.
 * @param precision The number of decimal places for the result. Defaults to 2.
 * @returns The calculated percentage as a number, or 0 if invalid.
 */
export const safePercentage = (numerator: number | undefined, denominator: number | undefined, precision: number = 2): number => {
  return safeDivide((numerator || 0) * 100, denominator, precision);
};