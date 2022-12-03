const { createReadStream } = require('node:fs');
const { createInterface } = require('node:readline');

async function solve(file) {
  const reader = createInterface(createReadStream(file));

  var sum = 0;
  var group = [];

  reader.on('line', (line) => {
    var r = line.split("");
    group.push(r);
    if (group.length == 3) {
      var unique = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
        .filter(e => {
          return group[0].includes(e)
            && group[1].includes(e)
            && group[2].includes(e)
        });
      sum += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(unique[0]) + 1;
      group = [];
    }
  });

  reader.on('close', () => {
    console.log(sum);
  });
}

solve(process.argv[2]);
