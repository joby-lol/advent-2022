const { createReadStream } = require('node:fs');
const { createInterface } = require('node:readline');

const width = 40;
const height = 6;

var clock = 0;
var x = 1;
var pixel_row = 0;
var pixel_column = 0;
var pixels = '';

function probe(cycle) {
  if (Math.abs(x - pixel_column) <= 1) pixels += '#';
  else pixels += ' ';
  if (++pixel_column == width) {
    pixel_column = 0;
    pixel_row++;
    pixels += "\n";
  }
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
    console.log(pixels);
  });
}

solve(process.argv[2]);
