const { createReadStream } = require('node:fs');
const { createInterface } = require('node:readline');

/** @type array<Monkey> */
const monkeys = [];

class Monkey {
  /** @type {int[]} */
  items = [];
  /** @type {int} */
  test = null;
  /** @type {string[]} */
  operation = null;
  /** @type {int} */
  trueTarget = null;
  /** @type {int} */
  falseTarget = null;
  /** @type {int} */
  count = 0;

  inspect() {
    while (this.items.length > 0) {
      this.count++;
      var item = this.items.shift();
      item = this.doOperation(item);
      item = Math.floor(item / 3);
      if (item % this.test == 0) this.throw(item, this.trueTarget);
      else this.throw(item, this.falseTarget);
    }
  }

  throw(item, target) {
    monkeys[target].items.push(item);
  }

  doOperation(old) {
    const left = this.operation[0] == 'old' ? old : parseInt(this.operation[0], 10);
    const right = this.operation[2] == 'old' ? old : parseInt(this.operation[2], 10);
    switch (this.operation[1]) {
      case '+': return left + right;
      case '*': return left * right;
    }
  }
}

async function solve(file) {
  const reader = createInterface(createReadStream(file));

  var readingMonkey = null;

  reader.on('line', (line) => {
    line = line.trim();
    if (line.startsWith('Monkey')) {
      readingMonkey = new Monkey;
      monkeys.push(readingMonkey);
    } else {
      line = line.split(': ');
      switch (line[0]) {
        case 'Starting items':
          readingMonkey.items = line[1].split(', ').map(e => parseInt(e, 10));
          break;
        case 'Operation':
          readingMonkey.operation = line[1].split(' = ')[1].split(' ');
          break;
        case 'Test':
          readingMonkey.test = parseInt(line[1].substring(13), 10);
          break;
        case 'If true':
          readingMonkey.trueTarget = parseInt(line[1].substring(16), 10);
          break;
        case 'If false':
          readingMonkey.falseTarget = parseInt(line[1].substring(16), 10);
          break;
      }
    }
  });

  reader.on('close', () => {
    // do 20 rounds
    for (let r = 0; r < 20; r++) {
      for (let m = 0; m < monkeys.length; m++) {
        const monkey = monkeys[m];
        monkey.inspect();
      }
    }
    // output result
    var counts = monkeys.map(e => e.count).sort((a, b) => a - b);
    console.log(counts.pop() * counts.pop());
  });
}

solve(process.argv[2]);
