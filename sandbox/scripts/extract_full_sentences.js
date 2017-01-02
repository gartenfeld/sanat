const fs = require('fs');
const path = require('path');
const _ = require('lodash');
var MongoClient = require('mongodb').MongoClient;
var natural = require('natural');
var tokenizer = new natural.RegexpTokenizer({pattern: /[^A-Za-zÅåÄäÖö]/});

const OUTPUT_PATH = path.resolve('../data/full_sentences.txt');

function hasEndPunct(str) {
  return _.some(['.', '!', '?'], punct => {
    return _.endsWith(str, punct);
  });
}

const DB_URL = 'mongodb://localhost:27017/suomi';
MongoClient.connect(DB_URL, function(err, db) {
  var collection = db.collection('citations');
  collection.find({}).toArray(function(err, docs) {
    var proper = docs.map(doc => doc.fi).filter(s => {
      return hasEndPunct(s) && /^[A-ZÄÖ\"\–\-\―\[\d]/.test(s);
    });
    // console.log(proper.length);
    fs.writeFileSync(OUTPUT_PATH, proper.join('\n'));
  });
});
