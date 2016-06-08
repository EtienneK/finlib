import chai from 'chai';
import { fv, pv, pmt, npv, nper, ipmt } from '../lib/finlib.js';

const assert = chai.assert;
const delta = 1e-9;

var lib;

it('fv() Tests', () => {
  let r, y, p, n, t;

  r = 0; n = 3; y = 2; p = 7; t = true;
  assert.closeTo(fv(r, n, y, p, t), -13, delta, 'fv');

  r = 1; n = 10; y = 100; p = 10000; t = false;
  assert.closeTo(fv(r, n, y, p, t), -10342300, delta, 'fv');

  r = 1; n = 10; y = 100; p = 10000; t = true;
  assert.closeTo(fv(r, n, y, p, t), -10444600, delta, 'fv');

  r = 2; n = 12; y = 120; p = 12000; t = false;
  assert.closeTo(fv(r, n, y, p, t), -6409178400, delta, 'fv');

  r = 2; n = 12; y = 120; p = 12000; t = true;
  assert.closeTo(fv(r, n, y, p, t), -6472951200, delta, 'fv');

  r = 2.95; n = 13.0; y = 13000.0; p = -4406.78544294496; t = false;
  assert.closeTo(fv(r, n, y, p, t), 333891.229919434, delta, 'fv');

  r = 2.95; n = 13; y = 13000; p = -17406.7852148156; t = true;
  assert.closeTo(fv(r, n, y, p, t), 333891.227783203, delta, 'fv');
});

it('pv() Tests', () => {
  let f, r, y, n, t;

  r = 0; n = 3; y = 2; f = 7; t = true;
  assert.closeTo(pv(r, n, y, f, t), -13, delta, 'pv');

  r = 1; n = 10; y = 100; f = 10000; t = false;
  assert.closeTo(pv(r, n, y, f, t), -109.66796875, delta, 'pv');

  r = 1; n = 10; y = 100; f = 10000; t = true;
  assert.closeTo(pv(r, n, y, f, t), -209.5703125, delta, 'pv');

  r = 2.95; n = 13; y = 13000; f = 333891.23; t = false;
  assert.closeTo(pv(r, n, y, f, t), -4406.78544294496, delta, 'pv');

  r = 2.95; n = 13; y = 13000; f = 333891.23; t = true;
  assert.closeTo(pv(r, n, y, f, t), -17406.7852148156, delta, 'pv');

  r = 2; n = 12; y = 120; f = -6409178400; t = false;
  assert.closeTo(pv(r, n, y, f, t), 12000, delta, 'pv');

  r = 2; n = 12; y = 120; f = -6472951200; t = true;
  assert.closeTo(pv(r, n, y, f, t), 12000, delta, 'pv');
});

it('pmt() Tests', () => {
  let f, r, p, n, t;

  r = 0; n = 3; p = 2; f = 7; t = true;
  assert.closeTo(pmt(r, n, p, f, t), -3, delta, 'pmt');

  r = 1; n = 10; p = -109.66796875; f = 10000; t = false;
  assert.closeTo(pmt(r, n, p, f, t), 100, delta, 'pmt');

  r = 1; n = 10; p = -209.5703125; f = 10000; t = true;
  assert.closeTo(pmt(r, n, p, f, t), 100, delta, 'pmt');

  r = 2; n = 12; f = -6409178400; p = 12000; t = false;
  assert.closeTo(pmt(r, n, p, f, t), 120, delta, 'pmt');

  r = 2; n = 12; f = -6472951200; p = 12000; t = true;
  assert.closeTo(pmt(r, n, p, f, t), 120, delta, 'pmt');
});

it('npv() Tests', () => {
  let r, v;

  r = 1; v = [100, 200, 300, 400];
  assert.closeTo(npv(r, ...v), 162.5, delta, 'pv');

  r = 2.5; v = [1000, 666.66666, 333.33, 12.2768416];
  assert.closeTo(npv(r, ...v), 347.99232604144827, delta, 'npv');

  r = 12.33333; v = [1000, 0, -900, -7777.5765];
  assert.closeTo(npv(r, ...v), 74.3742433377061, delta, 'npv');

  r = 0.05; v = [200000, 300000.55, 400000, 1000000, 6000000, 7000000, -300000];
  assert.closeTo(npv(r, ...v), 11342283.423312401, delta, 'npv');
});

it('nper() Tests', () => {
  let f, r, y, p, t;

  r = 0; y = 7; p = 2; f = 3; t = false;
  assert.closeTo(nper(r, y, p, f, t), -0.71428571429, delta, 'nper');

  r = 1; y = 100; p = -109.66796875; f = 10000; t = false;
  assert.closeTo(nper(r, y, p, f, t), 10, delta, 'nper');

  r = 1; y = 100; p = -209.5703125; f = 10000; t = true;
  assert.closeTo(nper(r, y, p, f, t), 10, delta, 'nper');

  r = 2; y = 120; f = -6409178400; p = 12000; t = false;
  assert.closeTo(nper(r, y, p, f, t), 12, delta, 'nper');

  r = 2; y = 120; f = -6472951200; p = 12000; t = true;
  assert.closeTo(nper(r, y, p, f, t), 12, delta, 'nper');
});

it('ipmt() Tests', () => {
  assert.closeTo(ipmt(0.1 / 12, 6, 2 * 12, 100000, 1000000, false), 928.8235718400465, delta, 'ipmt');
  assert.closeTo(ipmt(0.1 / 12, 6, 2 * 12, 100000, 1000000, true), 921.1473439736042, delta, 'ipmt');
  assert.closeTo(ipmt(0.1 / 12, 1, 2 * 12, 100000, 1000000, true), 0, delta, 'ipmt');
  assert.closeTo(ipmt(0.1 / 12, 1, 2 * 12, 100000, 1000000, false), -833.3333333333334, delta, 'ipmt');
});
