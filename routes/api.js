'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function(app) {

  let convertHandler = new ConvertHandler();
  app.route('/api/convert').get((req, res) => {
    let result = convertHandler.validate(req.query.input);
    res.status(200).json(result);
    // res.send(result);
  });
};
