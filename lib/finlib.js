(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("finlib", [], factory);
	else if(typeof exports === 'object')
		exports["finlib"] = factory();
	else
		root["finlib"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.fv = fv;
	exports.pv = pv;
	exports.pmt = pmt;
	exports.npv = npv;
	exports.nper = nper;
	exports.ipmt = ipmt;
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
	function fv(rate, nper, pmt) {
	  var pv = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
	  var type = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];
	
	  if (rate === 0) {
	    return -1 * (pv + nper * pmt);
	  }
	
	  var r1 = rate + 1;
	
	  return (1 - Math.pow(r1, nper)) * (type ? r1 : 1) * pmt / rate - pv * Math.pow(r1, nper);
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
	function pv(rate, nper, pmt) {
	  var fv = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
	  var type = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];
	
	  if (rate === 0) {
	    return -1 * (nper * pmt + fv);
	  }
	  var r1 = rate + 1;
	
	  return ((1 - Math.pow(r1, nper)) / rate * (type ? r1 : 1) * pmt - fv) / Math.pow(r1, nper);
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
	function pmt(rate, nper, pv) {
	  var fv = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
	  var type = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];
	
	  if (rate === 0) {
	    return -1 * (fv + pv) / nper;
	  }
	  var r1 = rate + 1;
	
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
	function npv(rate) {
	  var npv = 0;
	  var r1 = rate + 1;
	  var trate = r1;
	
	  for (var _len = arguments.length, cashFlows = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    cashFlows[_key - 1] = arguments[_key];
	  }
	
	  for (var i = 0, iSize = cashFlows.length; i < iSize; ++i) {
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
	function nper(rate, pmt, pv) {
	  var fv = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
	  var type = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];
	
	  if (rate === 0) {
	    return -1 * (fv + pv) / pmt;
	  }
	  var r1 = rate + 1;
	  var ryr = (type ? r1 : 1) * pmt / rate;
	  var a1 = ryr - fv < 0 ? Math.log(fv - ryr) : Math.log(ryr - fv);
	  var a2 = ryr - fv < 0 ? Math.log(-pv - ryr) : Math.log(pv + ryr);
	  var a3 = Math.log(r1);
	
	  return (a1 - a2) / a3;
	}
	
	/**
	 * Interest Payment
	 *
	 * @param {number} rate is the interest rate per period. For example, use 6%/4 for quarterly payments at 6% APR.
	 * @param {number} per is the period for which you want to find the interest and must be in the range 1 to nper.
	 * @param {number} nper is the total number of payment periods in the investment.
	 * @param {number} pv is the present value, or the lump-sum amount that a series of future payments is worth now.
	 * @param {number} [fv=0] is the future value, or a cash balance you want to attain after the last payment is made.
	 * @param {boolean} [type=false] is a value representing the timing of payment: payment at the beginning
	 *                               of the period == true; payment at the end of the period == false or omitted.
	 * @returns {number} the interest payment for a given period for an investment, based on periodic, constant
	 *                   payments and a constant interest rate.
	 */
	function ipmt(rate, per, nper, pv) {
	  var fv_ = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
	  var type = arguments.length <= 5 || arguments[5] === undefined ? false : arguments[5];
	
	  var payment = pmt(rate, nper, pv, fv_, type);
	  var interest = void 0;
	
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

/***/ }
/******/ ])
});
;
//# sourceMappingURL=finlib.js.map