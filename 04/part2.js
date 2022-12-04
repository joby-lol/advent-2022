const { createReadStream } = require('node:fs');
const { createInterface } = require('node:readline');

async function solve(file) {
  const reader = createInterface(createReadStream(file));

  var count = 0;

  reader.on('line', (line) => {
    const l = line.split(",").map(e => e.split("-").map(e => parseInt(e, 10)));
    if (l[0][0] > l[1][1]) return;
    if (l[0][1] < l[1][0]) return;
    if (l[1][0] > l[0][1]) return;
    if (l[1][1] < l[0][0]) return;
    count++;
  });

  reader.on('close', () => {
    console.log(count);
  });
}

solve(process.argv[2]);
