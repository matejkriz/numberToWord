var debug = require('debug')('api:t9');
var t9 = require('super-t9');

exports.getWordFromNumber = getWordFromNumber;

// TODO: replace with better dictionary, make it configurable
t9.setWordList('1000-words', 'csv', '1000-words.csv');

function getWordFromNumber(req, res, next) {
  if (!req.query.number || req.query.number.length < 1) {
    res
      .status(400)
      .send('Missing parameter!');
  } else {
    var matches = t9.getWordsFromNumber(req.query.number, '1000-words');
    res.send(matches);
  }
};
