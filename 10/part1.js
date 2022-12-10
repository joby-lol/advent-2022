const { createReadStream } = require('node:fs');
const { createInterface } = require('node:readline');

var clock = 0;
var x = 1;
var result = 0;

function probe(cycle) {
  if ([20, 60, 100, 140, 180, 220].indexOf(cycle) == -1) return;
  result += cycle * x;
}

async function solve(file) {
  const reader = createInterface(createReadStream(file));

  reader.on('line', (line) => {
    line = line.split(' ');
    const command = line[0];
    if (command == 'noop') {
      probe(++clock);
    } else if (command == 'addx') {
      probe(++clock);
      probe(++clock);
      const v = parseInt(line[1]);
      x += v;
    }
  });

  reader.on('close', () => {
    console.log(result);
  });
}

solve(process.argv[2]);
