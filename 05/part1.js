const { createReadStream } = require('node:fs');
const { createInterface } = require('node:readline');

async function solve(file) {
  const reader = createInterface(createReadStream(file));

  var stacks = [];

  reader.on('line', (line) => {
    if (line.charAt(1) == "1") {
      // does nothing
    } else if (line.charAt(0) == 'm') {
      // do a move operation
      line = line.split(" ");
      var f = stacks[line[3]];
      var t = stacks[line[5]];
      for (let index = 0; index < line[1]; index++) {
        t.push(f.pop());
      }
    } else if (line.charAt(1) != '1') {
      //input a row
      line = line.split("");
      var stack = 0;
      while (line.length >= 3) {
        var char;
        stack++;
        if (!stacks.hasOwnProperty(stack)) {
          stacks[stack] = [];
        }
        line.shift();
        if ((char = line.shift()) != ' ') {
          stacks[stack].unshift(char);
        }
        line.shift();
        line.shift();
      }
    }
  });

  reader.on('close', () => {
    console.log(stacks.map(e=>e.pop()).join(""));
  });
}

solve(process.argv[2]);
