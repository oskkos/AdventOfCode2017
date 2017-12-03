import { input as day3input } from './day3-input';
export { task1, task2 };

/**
 * --- Day 3: Spiral Memory ---
 * 
 * You come across an experimental new kind of memory stored on an infinite two-dimensional grid.
 * 
 * Each square on the grid is allocated in a spiral pattern starting at a location marked 1 and
 * then counting up while spiraling outward. For example, the first few squares are allocated
 * like this:
 * 
 * 17  16  15  14  13
 * 18   5   4   3  12
 * 19   6   1   2  11
 * 20   7   8   9  10
 * 21  22  23---> ...
 * While this is very space-efficient (no squares are skipped), requested data must be carried
 * back to square 1 (the location of the only access port for this memory system) by programs
 * that can only move up, down, left, or right. They always take the shortest path: the Manhattan
 * Distance between the location of the data and square 1.
 * 
 * For example:
 * 
 * Data from square 1 is carried 0 steps, since it's at the access port.
 * Data from square 12 is carried 3 steps, such as: down, left, left.
 * Data from square 23 is carried only 2 steps: up twice.
 * Data from square 1024 must be carried 31 steps.
 * How many steps are required to carry the data from the square identified in your puzzle input
 * all the way to the access port?
 * 
 * @param input 
 */
function task1(input:number = day3input):number {
  const spiral:Spiral = {
    map: { 0: { 0: 1 } },
    current: 1,
    x: 0,
    y: 0,
    right: 0,
    top: 0,
    left: 0,
    bottom: 0,
  };
  if (input < 2) { return 0; }

  function check():boolean {
    return spiral.current < input;
  }
  while (true) {
    right(check, spiral);
    top(check, spiral);
    left(check, spiral);
    bottom(check, spiral);
    if (!check()) {
      return Math.abs(spiral.x) + Math.abs(spiral.y);
    }
  }
}
interface Spiral {
  map: XMap;
  current: number;
  x: number;
  y: number;
  right: number;
  top: number;
  left: number;
  bottom: number;
}
interface XMap {
  [key:number]: YMap;
}
interface YMap {
  [key:number]: number;
}
function pushIntoMap(spiral:Spiral):void {
  const yMap:YMap = spiral.map[spiral.x];
  if (typeof spiral.map[spiral.x] === 'undefined') {
    spiral.map[spiral.x] = {};
  }

  const sum = getMapValue(spiral.map, spiral.x - 1, spiral.y + 1) +
  getMapValue(spiral.map, spiral.x, spiral.y + 1) +
  getMapValue(spiral.map, spiral.x + 1, spiral.y + 1) +
  getMapValue(spiral.map, spiral.x - 1, spiral.y) +
  getMapValue(spiral.map, spiral.x + 1, spiral.y) +
  getMapValue(spiral.map, spiral.x - 1, spiral.y - 1) +
  getMapValue(spiral.map, spiral.x, spiral.y - 1) +
  getMapValue(spiral.map, spiral.x + 1, spiral.y - 1);

  if (sum > 0) {
    spiral.map[spiral.x][spiral.y] = sum;
  } else {
    spiral.map[spiral.x][spiral.y] = 1;
  }
}
function getMapValue(map:XMap, x:number, y:number):number {
  if (typeof map[x] !== 'undefined' && typeof map[x][y] !== 'undefined') {
    return map[x][y];
  }
  return 0;
}
function right(check:Function, spiral:Spiral) {
  while (spiral.x <= spiral.right && check()) {
    spiral.current = spiral.current + 1;
    spiral.x = spiral.x + 1;
    pushIntoMap(spiral);
  }
  if (spiral.x > spiral.right) {
    spiral.right = spiral.right + 1;
  }
}
function top(check:Function, spiral:Spiral) {
  while (spiral.y <= spiral.top && check()) {
    spiral.current = spiral.current + 1;
    spiral.y = spiral.y + 1;
    pushIntoMap(spiral);
  }
  if (spiral.y > spiral.top) {
    spiral.top = spiral.top + 1;
  }
}
function left(check:Function, spiral:Spiral) {
  while (spiral.x >= spiral.left && check()) {
    spiral.current = spiral.current + 1;
    spiral.x = spiral.x - 1;
    pushIntoMap(spiral);
  }
  if (spiral.x < spiral.left) {
    spiral.left = spiral.left - 1;
  }
}
function bottom(check:Function, spiral:Spiral) {
  while (spiral.y >= spiral.bottom && check()) {
    spiral.current = spiral.current + 1;
    spiral.y = spiral.y - 1;
    pushIntoMap(spiral);
  }
  if (spiral.y < spiral.bottom) {
    spiral.bottom = spiral.bottom - 1;
  }
}

/**
 * --- Part Two ---
 * 
 * As a stress test on the system, the programs here clear the grid and then store the value 1 in 
 * square 1. Then, in the same allocation order as shown above, they store the sum of the values in
 * all adjacent squares, including diagonals.
 * 
 * So, the first few squares' values are chosen as follows:
 * 
 * Square 1 starts with the value 1.
 * Square 2 has only one adjacent filled square (with value 1), so it also stores 1.
 * Square 3 has both of the above squares as neighbors and stores the sum of their values, 2.
 * Square 4 has all three of the aforementioned squares as neighbors and stores the sum of their
 * values, 4.
 * Square 5 only has the first and fourth squares as neighbors, so it gets the value 5.
 * Once a square is written, its value does not change. Therefore, the first few squares would
 * receive the following values:
 * 
 * 147  142  133  122   59
 * 304    5    4    2   57
 * 330   10    1    1   54
 * 351   11   23   25   26
 * 362  747  806--->   ...
What is the first value written that is larger than your puzzle input?
 * @param input 
 */
function task2(input:number = day3input):number {
  const spiral:Spiral = {
    map: { 0: { 0: 1 } },
    current: 1,
    x: 0,
    y: 0,
    right: 0,
    top: 0,
    left: 0,
    bottom: 0,
  };
  if (input < 2) { return 2; }

  function check():boolean {
    return spiral.map[spiral.x][spiral.y] <= input;
  }
  while (true) {
    right(check, spiral);
    top(check, spiral);
    left(check, spiral);
    bottom(check, spiral);
    if (!check()) {
      return spiral.map[spiral.x][spiral.y];
    }
  }
}
