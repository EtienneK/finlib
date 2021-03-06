/**
 * Future Value
 *
 * @param {number} rate is the interest rate per period. For example, use 6%/4 for quarterly payments at 6% APR.
 * @param {number} nper is the total number of payment periods in the investment.
 * @param {number} pmt is the payment made each period; it cannot change over the life of the investment.
 * @param {number} [pv=0] is the present value, or the lump-sum amount that a series of future payments is worth now.
 * @param {boolean} [type=false] is a value representing the timing of payment: payment at the beginning
 *                               of the period == true; payment at the end of the period == false or omitted.
 * @returns {number} the future value of an investment based on periodic, constant payments and a
 *                   constant interest rate.
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
 * Payment
 *
 * @param {number} rate is the interest rate per period. For example, use 6%/4 for quarterly payments at 6% APR.
 * @param {number} nper is the total number of payment periods in the investment.
 * @param {number} pv is the present value, or the lump-sum amount that a series of future payments is worth now.
 * @param {number} [fv=0] is the future value, or a cash balance you want to attain after the last payment is made.
 * @param {boolean} [type=false] is a value representing the timing of payment: payment at the beginning
 *                               of the period == true; payment at the end of the period == false or omitted.
 * @returns {number} the payment based on constant payments and a constant interest rate.
 */
export function pmt(rate, nper, pv, fv = 0, type = false) {
  if (rate === 0) {
    return -1 * (fv + pv) / nper;
  }
  const r1 = rate + 1;

  return (fv + pv * Math.pow(r1, nper)) * rate / ((type ? r1 : 1) * (1 - Math.pow(r1, nper)));
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

/**
 * Number of Periods
 *
 * @param {number} rate is the interest rate per period. For example, use 6%/4 for quarterly payments at 6% APR.
 * @param {number} pmt is the payment made each period; it cannot change over the life of the investment.
 * @param {number} pv is the present value, or the lump-sum amount that a series of future payments is worth now.
 * @param {number} [fv=0] is the future value, or a cash balance you want to attain after the last payment is made.
 * @param {boolean} [type=false] is a value representing the timing of payment: payment at the beginning
 *                               of the period == true; payment at the end of the period == false or omitted.
 * @returns {number} the number of periods for an investment based on periodic,
 *                   constant payments and a constant interest rate.
 */
export function nper(rate, pmt, pv, fv = 0, type = false) {
  if (rate === 0) {
    return -1 * (fv + pv) / pmt;
  }
  const r1 = rate + 1;
  const ryr = (type ? r1 : 1) * pmt / rate;
  const a1 = ((ryr - fv) < 0) ? Math.log(fv - ryr) : Math.log(ryr - fv);
  const a2 = ((ryr - fv) < 0) ? Math.log(-pv - ryr) : Math.log(pv + ryr);
  const a3 = Math.log(r1);

  return (a1 - a2) / a3;
}

/**
 * Interest Payment
 *
 * @param {number} rate is the interest rate per period. For example, use 6%/4 for quarterly payments at 6% APR.
 * @param {number} per is the period for which you want to find the interest and must be in the range 1 to nper.
 * @param {number} nper is the total number of payment periods in the investment.
 * @param {number} pv is the present value, or the lump-sum amount that a series of future payments is worth now.
 * @param {number} [fv_=0] is the future value, or a cash balance you want to attain after the last payment is made.
 * @param {boolean} [type=false] is a value representing the timing of payment: payment at the beginning
 *                               of the period == true; payment at the end of the period == false or omitted.
 * @returns {number} the interest payment for a given period for an investment, based on periodic, constant
 *                   payments and a constant interest rate.
 */
export function ipmt(rate, per, nper, pv, fv_ = 0, type = false) {
  const payment = pmt(rate, nper, pv, fv_, type);
  let interest;

  if (per === 1) {
    if (type) {
      interest = 0;
    } else {
      interest = -pv;
    }
  } else {
    if (type) {
      interest = fv(rate, per - 2, payment, pv, true) - payment;
    } else {
      interest = fv(rate, per - 1, payment, pv, false);
    }
  }

  return interest * rate;
}
