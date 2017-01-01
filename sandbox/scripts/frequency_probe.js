const fs = require('fs');
const path = require('path');
const _ = require('lodash');
var MongoClient = require('mongodb').MongoClient;

const FILE_PATH = path.resolve('../data/full_parole.txt');
const OUTPUT_PATH = path.resolve('../data/frequency.txt');

var dict = JSON.parse(fs.readFileSync(FILE_PATH));

const DB_URL = 'mongodb://localhost:27017/suomi';
MongoClient.connect(DB_URL, function(err, db) {
  db.collection('sanat').find({}).toArray(function(err, docs) {
    processDocs(docs);
  });
});

function processDocs(docs) {
  var freq = docs.map(doc => doc.headword)
    .reduce((memo, word) => {
      var rank = dict[word];
      if (rank) {
        memo[word] = rank;
      }
      return memo;
    }, {});
  
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(freq));
}
