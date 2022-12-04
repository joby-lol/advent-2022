const { createReadStream } = require('node:fs');
const { createInterface } = require('node:readline');

async function solve(file) {
  const reader = createInterface(createReadStream(file));

  var count = 0;

  reader.on('line', (line) => {
    const a = line.split(",").map(e => e.split("-").map(e => parseInt(e, 10)));
    if (a[0][0] <= a[1][0] && a[0][1] >= a[1][1]) count++;
    else if (a[1][0] <= a[0][0] && a[1][1] >= a[0][1]) count++;
  });

  reader.on('close', () => {
    console.log(count);
  });
}

solve(process.argv[2]);
