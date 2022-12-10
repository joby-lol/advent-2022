const { createReadStream } = require('node:fs');
const { createInterface } = require('node:readline');

class actor {
  x = 0;
  y = 0;

  moveToward(target) {
    // this could be better
    if (target.x > this.x + 1) {
      this.x++;
      if (target.y > this.y) this.y++;
      else if (target.y < this.y) this.y--;
    } else if (target.x < this.x - 1) {
      this.x--;
      if (target.y > this.y) this.y++;
      else if (target.y < this.y) this.y--;
    }
    if (target.y > this.y + 1) {
      this.y++;
      if (target.x > this.x) this.x++;
      else if (target.x < this.x) this.x--;
    } else if (target.y < this.y - 1) {
      this.y--;
      if (target.x > this.x) this.x++;
      else if (target.x < this.x) this.x--;
    }
  }

  moveDirection(direction) {
    if (direction == 'U') this.y++;
    else if (direction == 'D') this.y--;
    else if (direction == 'L') this.x--;
    else if (direction == 'R') this.x++;
  }
};

async function solve(file) {
  const reader = createInterface(createReadStream(file));

  const head = new actor();
  const tail = new actor();
  const visited = new Set(['0,0']);

  reader.on('line', (line) => {
    // read the line and move the head
    line = line.split(' ');
    const direction = line[0];
    var n = parseInt(line[1], 10);
    while (n--) {
      head.moveDirection(direction);
      tail.moveToward(head);
      visited.add(tail.x + "," + tail.y);
    }
  });

  reader.on('close', () => {
    console.log(visited.size);
  });
}

solve(process.argv[2]);
