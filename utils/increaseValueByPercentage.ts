/**
 * Increase given value by percentage
 *
 * @param value
 * @param {number} percent
 * @returns {number}
 */
const increaseValueByPercentage = (value: number, percent: number): number =>
  value + (value * percent) / 100;

export default increaseValueByPercentage;
