const fs = require('fs');
const path = require('path');
const _ = require('lodash');
// const parse = require('csv-parse/lib/sync');

const AUDIO_INDEX_PATH = path.resolve('../data/raw.json');
const FREQ_PATH = path.resolve('../data/frequency.json');
const OUTPUT_PATH = path.resolve('../data/curve.txt');

var audible = JSON.parse(fs.readFileSync(AUDIO_INDEX_PATH));
var freq = JSON.parse(fs.readFileSync(FREQ_PATH));

var select = audible.reduce((memo, word) => {
  var rank = freq[word.f];
  return rank ? memo.concat({ f: word.f, r: rank}) : memo;
}, []);

select = _.sortBy(select, 'r');

fs.writeFileSync(OUTPUT_PATH, JSON.stringify(select));
