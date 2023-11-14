const chai = require('chai');
let assert = chai.assert;
let expect = chai.expect;

const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('Conversion Handler', function() {
      test( 'should correctly read a whole number input', function() {
        let result = convertHandler.getNum('3');
        assert.typeOf(result, 'number');
      });
      test('should correctly read a decimal number input', function () {
        let result = convertHandler.getNum('3.5');
        assert.match(result, /\d*\.{1}\d*/);
        result = convertHandler.getNum('35');
      });
    test('should correctly read a fractional input', function () {
      let result = convertHandler.getNum('3/7');
      assert.match(result, /\d*\.{1}\d*/);
    });
    test('should correctly read a fractional input with a decimal', function () {
      let result = convertHandler.getNum('3/7.2');
      assert.match(result, /\d*\.{1}\d*/);
    });
    test('should correctly return an error on a double-fraction', function () {
      let result = convertHandler.getNum('3/2/3');
      assert.equal(result,'invalid number');
    });
    test('should correctly default to a numerical input of 1 when no numerical input is provided', function () {
      let result = convertHandler.getNum('lbs');
      assert.equal(result, 1);
    });
    test('should correctly read each valid input unit', function () {
      let validUnits = ["gal", "L", "lbs","kg", "mi", "km"];
      let result = '';
      for (const unit of validUnits) {
        result = convertHandler.getUnit(`2${unit}`);
        assert.typeOf(result,'string');
        assert.equal(result, unit);
      }
    });
    test('should correctly return an error for an invalid input unit', function () {
        let result = convertHandler.getUnit('2lbss');
        assert.equal(result, 'invalid unit');

    });
    test('should return the correct return unit for each valid input unit', function () {
      let validUnits = ["gal", "L", "lbs","kg", "mi", "km"];
      let result = '';
      for (const unit of validUnits) {
        result = convertHandler.getUnit(`2${unit}`);
        assert.equal(result, unit);
      }
    });
    test('should correctly return the spelled-out string unit for each valid input unit', function () {
      let validUnits = { "gal": "gallons", "L": "liters", "lbs": "pounds", "kg": "kilograms", "mi": "miles", "km": "kilometers" };
      let spelledOutUnits = Object.values(validUnits);
      let units = Object.keys(validUnits);
      let result = '';
      for (const unit of units) {
        result = convertHandler.spellOutUnit(`${unit}`);
        assert.equal(result, validUnits[unit]);
      }
    });
    test('should correctly convert gal to L', function () {
      let result = convertHandler.validate('1gal');
      assert.equal(result.returnNum, 3.78541);
      assert.equal(result.returnUnit,'L');
    });
    test('should correctly convert L to gal', function () {
      let result = convertHandler.validate('3.78541l');
      assert.equal(result.returnNum, 1);
      assert.equal(result.returnUnit, 'gal');
    });
    test('should correctly convert mi to km', function () {
      let result = convertHandler.validate('1mi');
      assert.equal(result.returnNum, 1.60934);
      assert.equal(result.returnUnit,'km');
    });
    test('should correctly convert km to mi', function () {
      let result = convertHandler.validate('1.60934km');
      assert.equal(result.returnNum, 1);
      assert.equal(result.returnUnit, 'mi');
    });
    test('should correctly convert lbs to kg', function () {
      let result = convertHandler.validate('1lbs');
      assert.equal(result.returnNum, 0.45359);
      assert.equal(result.returnUnit, 'kg');
    });
    test('should correctly convert kg to lbs', function () {
      let result = convertHandler.validate('0.453592kg');
      assert.equal(result.returnNum, 1);
      assert.equal(result.returnUnit, 'lbs');
    });
   
  });
});