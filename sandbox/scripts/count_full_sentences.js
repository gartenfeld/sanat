const fs = require('fs');
const path = require('path');
const _ = require('lodash');
var MongoClient = require('mongodb').MongoClient;

const FILE_PATH = path.resolve('../data/');
const OUTPUT_PATH = path.resolve('../data/');

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
    console.log(proper.length);
  });
});
