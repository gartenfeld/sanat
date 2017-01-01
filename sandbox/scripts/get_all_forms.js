const fs = require('fs');
const path = require('path');
const _ = require('lodash');
var MongoClient = require('mongodb').MongoClient;
var natural = require('natural');
var tokenizer = new natural.RegexpTokenizer({pattern: /[^A-Za-zÅåÄäÖö]/});

const OUTPUT_PATH = path.resolve('../data/all_forms.txt');

function hasEndPunct(str) {
  return _.some(['.', '!', '?'], punct => {
    return _.endsWith(str, punct);
  });
}

const DB_URL = 'mongodb://localhost:27017/suomi';
MongoClient.connect(DB_URL, function(err, db) {
  var collection = db.collection('citations');
  var allCitation = collection.find({}).toArray(function(err, docs) {
    var proper = docs.map(doc => doc.fi).filter(hasEndPunct);
    var occurrences = proper.map(sentence => {
      var words = tokenizer.tokenize(sentence)
        .map(word => word.toLowerCase());
      return words;
    });
    var uniques = _.uniq(_.flatten(occurrences));
    fs.writeFileSync(OUTPUT_PATH, uniques.join('\n'));
  });
});
