const { readFileSync } = require('node:fs');

const signal = readFileSync(process.argv[2]).toString().split("");

for (var i = 3; i < signal.length; i++) {
  var chunk = signal.slice(i - 4, i);
  var set = new Set(chunk);
  if (set.size == 4) {
    console.log(i);
    break;
  }
}