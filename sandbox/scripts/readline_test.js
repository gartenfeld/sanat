const fs = require('fs');
const path = require('path');
const readline = require('readline');

const FILE_PATH = path.resolve(__dirname, '../data/ingest_test.txt');
const stream = fs.createReadStream(FILE_PATH);
const interface = readline.createInterface({ input: stream });

interface.on('line', processLine);
interface.on('close', () => console.log("\nDone!"));

function processLine(line) {
  process.stdout.write(line.length + ' ');
}
