const fs = require('fs');
const path = require('path');
const _ = require('lodash');
// const parse = require('csv-parse/lib/sync');

const INPUT_PATH = path.resolve('../data/audible.json');
const OUTPUT_PATH = path.resolve('../data/ranked.json');

var audible = JSON.parse(fs.readFileSync(INPUT_PATH));

const LOG_BASE = 1.01;

function log(num) {
  return Math.log(num) / Math.log(LOG_BASE);
}

const FLOOR = 10;

function getRank(num) {
  var rank = Math.round(log(num) / 45);
  return _.max([(rank - FLOOR), 0]);
}

var ranked = audible.reduce((memo, word) => {
  memo[word.f] = getRank(word.r);
  return memo;
}, {});

console.log(_.countBy(_.values(ranked)));

// fs.writeFileSync(OUTPUT_PATH, JSON.stringify(ranked));
