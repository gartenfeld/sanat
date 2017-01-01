const fs = require('fs');
const path = require('path');
const _ = require('lodash');
var MongoClient = require('mongodb').MongoClient;

const INPUT_PATH = path.resolve('../data/audible.json');
// const OUTPUT_PATH = path.resolve('../data/none.txt');

var words = JSON.parse(fs.readFileSync(INPUT_PATH)).map(row => row.f);

const DB_URL = 'mongodb://localhost:27017/suomi';
MongoClient.connect(DB_URL, function(err, db) {
  var collection = db.collection('sanat');

  words.forEach(word => {
    collection.find({ headword: word })
      .toArray(function(err, docs) {
        if (!docs.length) {
          console.log(word);
        }
      });
  });

});
