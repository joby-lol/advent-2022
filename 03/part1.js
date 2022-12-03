const { createReadStream } = require('node:fs');
const { createInterface } = require('node:readline');

class rucksack {
  /** @param {string} letter */
  constructor(letters) {
    this.letters = letters.split("");
    this.first = new compartment(letters.substring(0, letters.length / 2));
    this.second = new compartment(letters.substring(letters.length / 2));
  }
}

class compartment {
  /** @param {string} letters */
  constructor(letters) {
    this.letters = letters.split("");
    this.items = this.letters.map(e => new item(e));
  }
}

class item {
  /** @param {string} letter */
  constructor(letter) {
    this.letter = letter;
    this.priority = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(letter) + 1;
  }
}

async function solve(file) {
  const reader = createInterface(createReadStream(file));

  var sum = 0;

  reader.on('line', (line) => {
    var r = new rucksack(line);
    var inBoth = r.first.letters
      .filter((f) => r.second.letters.includes(f));
    inBoth = inBoth
      .filter((e, index) => inBoth.indexOf(e) === index)
      .map(e => new item(e))
      .forEach(i => sum += i.priority);
  });

  reader.on('close', () => {
    console.log(sum);
  });
}

solve(process.argv[2]);
