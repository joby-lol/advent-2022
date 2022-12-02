const { createReadStream } = require('node:fs');
const { createInterface } = require('node:readline');

function winner(me, them) {
  if (me == 'R' && them == 'S') return true;
  else if (me == 'P' && them == 'R') return true;
  else if (me == 'S' && them == 'P') return true;
  else return false;
}

function decode(code) {
  switch (code) {
    case 'A': return 'R';
    case 'B': return 'P';
    case 'C': return 'S';
    case 'X': return 'R';
    case 'Y': return 'P';
    case 'Z': return 'S';
  }
}

async function solve(file) {
  const reader = createInterface(createReadStream(file));

  var myScore = 0;

  reader.on('line', (line) => {
    const me = decode(line.charAt(2));
    const them = decode(line.charAt(0));
    const draw = me == them;
    const win = !draw && winner(me, them);
    // add to my running score
    var score = 0;
    if (win) score += 6;
    if (draw) score += 3;
    switch (me) {
      case 'R': score += 1; break;
      case 'P': score += 2; break;
      case 'S': score += 3; break;
    }
    myScore += score;
  });

  reader.on('close', () => {
    console.log(myScore);
  });
}

solve(process.argv[2]);
