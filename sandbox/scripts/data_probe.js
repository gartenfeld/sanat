const fs = require('fs');
const path = require('path');
const _ = require('lodash');
// const parse = require('csv-parse/lib/sync');

const FILE_PATH = path.resolve('../data/raw.json');

var raw = fs.readFileSync(FILE_PATH);
var rows = JSON.parse(raw);

console.log(rows.length);
