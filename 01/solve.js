const { once } = require('node:events');
const fs = require('node:fs');
const readline = require('node:readline');

async function solve(file) {

  // create a reader that will let me asynchronously loop through the lines of the file
  const reader = readline.createInterface({
    input: fs.createReadStream(file),
    crlfDelay: 0
  });

  // variable to store the number of calories each elf has
  var elves = [0];

  // process each line as it becomes available
  reader.on('line', (line) => {
    if (line) elves[0] += parseInt(line, 10);
    else elves.unshift(0);
  });

  // wait for reader to close
  await once(reader, 'close');

  // sort elves
  elves = elves.sort();

  // slice off highest elf to get highest value
  console.log('top elf has: ' + elves.slice(-1)[0]);

  // sort, slice, and reduce to sum
  console.log('top 3 elves have: ' + elves.slice(-3).reduce((a, e) => a + e));

}

solve(process.argv[2]);
