const { createReadStream } = require('node:fs');
const { createInterface } = require('node:readline');

async function solve(file) {
  const reader = createInterface(createReadStream(file));

  var ls = false;
  var cwd = [];
  var directories = {};

  reader.on('line', (line) => {
    line = line.split(" ");
    if (line[0] == "$") {
      ls = false;
      // process command
      if (line[1] == 'cd') {
        if (line[2] == '/') null;//does nothing
        else if (line[2] == '..') cwd.pop();
        else cwd.push(cwd.join('/') + "/" + line[2]);
      } else if (line[1] == 'ls') {
        ls = true;
      }
    } else if (ls) {
      // process ls
      if (line[0] != 'dir') {
        var size = parseInt(line[0], 10);
        cwd.forEach(dir => {
          if (!directories[dir]) directories[dir] = 0;
          directories[dir] += size;
        });
      }
    }
  });

  reader.on('close', () => {
    var sizes = [];
    for (const i in directories) {
      if (Object.hasOwnProperty.call(directories, i)) {
        const s = directories[i];
        if (s >= 8381165) sizes.push(s);
      }
    }
    console.log(sizes.sort());
  });
}

solve(process.argv[2]);
