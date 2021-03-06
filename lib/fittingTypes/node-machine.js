/****************************************************************************
 The MIT License (MIT)

 Copyright (c) 2015 Apigee Corporation

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
'use strict';

var debug = require('debug')('pipes:fittings');
var _ = require('lodash');
var util = require('util');
var assert = require('assert');

module.exports = function createFitting(config, fittingDef) {

  assert(fittingDef.machinepack, util.format('machinepack is required on fitting: %j', fittingDef));
  assert(fittingDef.machine, util.format('machine is required on fitting: %j', fittingDef));

  var machinepack = require(fittingDef.machinepack);

  var machine = machinepack[fittingDef.machine] || _.find(machinepack, function(machine) {
      return fittingDef.machine == machine.id;
    });

  if (!machine) {
    throw new Error(util.format('unknown machine: %s : %s', fittingDef.machinepack, fittingDef.machine));
  }

  return function(context, next) {
    machine(context.input, next);
  };
};
