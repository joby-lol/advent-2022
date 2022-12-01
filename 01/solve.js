const { once } = require('node:events');
const fs = require('node:fs');
const readline = require('node:readline');

async function solve(file) {
  const reader = readline.createInterface({
    input: fs.createReadStream(file),
    crlfDelay: 0
  });

  var elves = [];
  var current = 0;

  reader.on('line', (line) => {
    if (line) current += parseInt(line, 10);
    else {
      elves.push(current);
      current = 0;
    }
  });

  await once(reader, 'close');

  console.log('top 3 elves have: ' + elves.sort().slice(-3).reduce((a, e) => a + e));
}

solve(process.argv[2]);
