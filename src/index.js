/**
 * Future Value
 *
 * @param {number} rate is the interest rate per period. For example, use 6%/4 for quarterly payments at 6% APR.
 * @param {number} nper is the total number of payment periods in the investment.
 * @param {number} pmt is the payment made each period; it cannot change over the life of the investment.
 * @param {number} [pv=0] is the present value, or the lump-sum amount that a series of future payments is worth now.
 * @param {boolean} [type=false] is a value representing the timing of payment: payment at the beginning
 *                               of the period == true; payment at the end of the period == false or omitted.
 * @returns {number} the future value of an investment based on periodic, constant payments and a constant interest rate.
 */
export function fv(rate, nper, pmt, pv = 0, type = false) {
  if (rate === 0) {
    return -1 * (pv + (nper * pmt));
  }

  const r1 = rate + 1;

  return ((1 - Math.pow(r1, nper)) * (type ? r1 : 1) * pmt) / rate -
    pv * Math.pow(r1, nper);
}

/**
 * Present Value
 *
 * @param {number} rate is the interest rate per period. For example, use 6%/4 for quarterly payments at 6% APR.
 * @param {number} nper is the total number of payment periods in the investment.
 * @param {number} pmt is the payment made each period; it cannot change over the life of the investment.
 * @param {number} [fv=0] is the future value, or a cash balance you want to attain after the last payment is made.
 * @param {boolean} [type=false] is a value representing the timing of payment: payment at the beginning
 *                               of the period == true; payment at the end of the period == false or omitted.
 * @returns {number} the present value of an investment: the total amount that a series of future payments is worth now.
 */
export function pv(rate, nper, pmt, fv = 0, type = false) {
  if (rate === 0) {
    return -1 * ((nper * pmt) + fv);
  }
  const r1 = rate + 1;

  return (((1 - Math.pow(r1, nper)) / rate) * (type ? r1 : 1) * pmt - fv) / Math.pow(r1, nper);
}

/**
 * Net Present Value
 *
 * @param {number} rate is the rate of discount over the length of one period.
 * @param {...number} cashFlows are payments (negative values) and income (positive values),
 *                    equally spaced in time and occurring at the end of each period.
 * @returns {number} the net present value of an investment based on a discount rate and a series of future
 *                   payments (negative values) and income (positive values).
 */
export function npv(rate, ...cashFlows) {
  let npv = 0;
  const r1 = rate + 1;
  let trate = r1;

  for (let i = 0, iSize = cashFlows.length; i < iSize; ++i) {
    npv += cashFlows[i] / trate;
    trate *= r1;
  }
  return npv;
}
