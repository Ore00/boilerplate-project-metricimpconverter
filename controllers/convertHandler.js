function ConvertHandler() {



  this.validate = function(input) {
    try {
      this.initNum = this.getNum(input);
      this.initUnit = this.getUnit(input);
      this.returnUnit = this.getReturnUnit(this.initUnit);

      if (this.initNum === 'invalid number' && this.returnUnit === 'invalid unit') { 
        throw new Error('invalid number and unit'); }
      else if (this.initNum === 'invalid number') { throw new Error('invalid number'); }
      else if (this.returnUnit === 'invalid unit') {
        throw new Error('invalid unit');
      } else {
        this.returnNum = this.convert(this.initNum, this.initUnit);
        this.returnUnit = this.returnUnit;
        this.string = this.getString(this.initNum, this.initUnit, this.returnNum, this.returnUnit);

        return {
          initNum: this.initNum,
          initUnit: this.initUnit,
          returnNum: this.returnNum,
          returnUnit: this.returnUnit,
          string: this.string
        }
      }
    } catch (e) {
      return e.message;
    }
  }


  this.getNum = function(input) {
    let result = input.replace(/[a-zA-Z]/g, '');
    let matched = 0;
    if (result.length >= 3) {
      for (const char of result) {
        if (char === '/') {
          matched++;
          if (matched > 1) {
            return 'invalid number';
          }
        }
      }
      if (matched == 1) {
        let nums = result.split('/');
        result = nums[0] / nums[1];
      }
    }
    return result = Number(result === '' ? 1 : result);
  };

  this.getUnit = function(input) {
    let result = input.replace(/[0-9\.\/]/g, '');
    let validUnits = ["gal", "L", "lbs","kg", "mi", "km"];
    result = result.trim().toLowerCase();
    if (result.trim() === "l") { result = "L";}
    if (!validUnits.includes(result))  { return "invalid unit";}
    return result;
  };

  this.getReturnUnit = function(initUnit) {
    let unit = initUnit.trim() === "l" ? "L" : initUnit.trim();
    let units = { "gal": "L", "L": "gal", "lbs": "kg", "kg": "lbs", "mi": "km", "km": "mi" };
    let result = units[unit] === '' || !units.hasOwnProperty(unit) ? 'invalid unit' : units[unit];

    return result;
  };

  this.spellOutUnit = function(unit) {
    unit = unit.trim() === "l" ? "L" : unit.trim();
    let units = { "gal": "gallons", "L": "liters", "lbs": "pounds", "kg": "kilograms", "mi": "miles", "km": "kilometers" };
    let result = units[unit];
    return result;
  };

  this.convert = function(initNum = 1, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const kgToLbs = 2.20462;
    const miToKm = 1.60934;
    let result;
    switch (initUnit) {
      case "gal":
        result = galToL * initNum;
        break;
      case "L":
        result = initNum / galToL;
        break;
      case "lbs":
        result = lbsToKg * initNum;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "mi":
        result = miToKm * initNum;
        break;
      case "km":
        result = initNum / miToKm;
        break
      default:
        result = 'invalid unit';
    }


    return isNaN(result) ?
      result :
      initUnit === 'lbs' ? parseFloat(result.toFixed(5)) :
        parseFloat(result.toFixed(5));

  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let spellOutInitUnit = this.spellOutUnit(initUnit);
    let spellOutReturnUnit = this.spellOutUnit(returnUnit);
    let result = `${initNum} ${spellOutInitUnit} converts to ${returnNum} ${spellOutReturnUnit}`;

    return result;
  };

}

module.exports = ConvertHandler;
