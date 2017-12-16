import { input as day14input } from './day14-input';
import { task2 as hashRunner } from './day10';
export { task1, task2 };

/**
 * --- Day 14: Disk Defragmentation ---
 * Suddenly, a scheduled job activates the system's disk defragmenter. Were the situation
 * different, you might sit and watch it for a while, but today, you just don't have that kind of
 * time. It's soaking up valuable system resources that are needed elsewhere, and so the only option
 * is to help it finish its task as soon as possible.
 *
 * The disk in question consists of a 128x128 grid; each square of the grid is either free or used.
 * On this disk, the state of the grid is tracked by the bits in a sequence of knot hashes.
 *
 * A total of 128 knot hashes are calculated, each corresponding to a single row in the grid; each
 * hash contains 128 bits which correspond to individual grid squares. Each bit of a hash indicates
 * whether that square is free (0) or used (1).
 *
 * The hash inputs are a key string (your puzzle input), a dash, and a number from 0 to 127
 * corresponding to the row. For example, if your key string were flqrgnkx, then the first row would
 * be given by the bits of the knot hash of flqrgnkx-0, the second row from the bits of the knot
 * hash of flqrgnkx-1, and so on until the last row, flqrgnkx-127.
 *
 * The output of a knot hash is traditionally represented by 32 hexadecimal digits; each of these
 * digits correspond to 4 bits, for a total of 4 * 32 = 128 bits. To convert to bits, turn each
 * hexadecimal digit to its equivalent binary value, high-bit first: 0 becomes 0000, 1 becomes 0001,
 * e becomes 1110, f becomes 1111, and so on; a hash that begins with a0c2017... in hexadecimal
 * would begin with 10100000110000100000000101110000... in binary.
 *
 * Given your actual key string, how many squares are used?
 * @param {string} input
 * @returns {number}
 */
function task1(input:string = day14input):number {
  return runner(input).reduce((sum, row) => {
    return sum + (row.length - row.replace(/1/g, '').length);
  }, 0);
}

function runner(input:string):string[] {
  const hexToBinary = require('hex-to-binary');
  const rows:string[] = [];
  for (let i = 0; i < 128; i = i + 1) {

    const hash:string = hashRunner(`${input}-${i}`);
    rows.push(hexToBinary(hash));
  }
  return rows;
}

/**
 * --- Part Two ---
 * Now, all the defragmenter needs to know is the number of regions. A region is a group of used
 *  squares that are all adjacent, not including diagonals. Every used square is in exactly one
 *  region: lone used squares form their own isolated regions, while several adjacent squares all
 *  count as a single region.
 *
 * In the example above, the following nine regions are visible, each marked with a distinct digit:
 *
 * 11.2.3..-->
 * .1.2.3.4   
 * ....5.6.   
 * 7.8.55.9   
 * .88.5...   
 * 88..5..8   
 * .8...8..   
 * 88.8.88.-->
 * |      |   
 * V      V   
 * Of particular interest is the region marked 8; while it does not appear contiguous in this small
 *  view, all of the squares marked 8 are connected when considering the whole 128x128 grid. In
 *  total, in this example, 1242 regions are present.
 *
 * How many regions are present given your key string?
 *
 * Your puzzle input is still jzgqcdpd.
 * @param {string} input
 * @returns {number}
 */
function task2(input:string = day14input):number {

  const map:Map = {};
  runner(input).forEach((row, i) => {
    row.split('').map(v => +v).forEach((cell, j) => {
      pushToMap(map, i, j, cell === 1 ? '#' : '.');
    });
  });
  let regions = 0;
  Object.keys(map).map(v => +v).forEach((i) => {
    Object.keys(map[i]).map(v => +v).forEach((j) => {
      if (map[i][j] === '#') {
        regions = regions + 1;
        fillRegion(map, i, j, regions);
      }
    });
  });
  return regions;
}
function fillRegion(map:Map, row:number, cell:number, region:number) {
  map[row][cell] = region;
  if (map[row - 1] && map[row - 1][cell] === '#') {
    fillRegion(map, row - 1, cell, region);
  }
  if (map[row + 1] && map[row + 1][cell] === '#') {
    fillRegion(map, row + 1, cell, region);
  }
  if (map[row][cell - 1] && map[row][cell - 1] === '#') {
    fillRegion(map, row, cell - 1, region);
  }
  if (map[row][cell + 1] && map[row][cell + 1] === '#') {
    fillRegion(map, row, cell + 1, region);
  }
/*
  const regions:number = runner(input).reduce((regions, row, rowIndex) => {
    row.split('').map(v => +v).forEach((val, cellIndex) => {
      if (val !== 1) { return; }

      if (map[rowIndex - 1] && map[rowIndex - 1][cellIndex]) {
        pushToMap(map, rowIndex, cellIndex, map[rowIndex - 1][cellIndex ]);
        return regions;
      }
      if (map[rowIndex + 1] && map[rowIndex + 1][cellIndex]) {
        pushToMap(map, rowIndex, cellIndex, map[rowIndex + 1][cellIndex]);
        return regions;
      }
      if (map[rowIndex] && map[rowIndex][cellIndex - 1]) {
        pushToMap(map, rowIndex, cellIndex, map[rowIndex][cellIndex - 1]);
        return regions;
      }
      if (map[rowIndex] && map[rowIndex][cellIndex + 1]) {
        pushToMap(map, rowIndex, cellIndex, map[rowIndex][cellIndex + 1]);
        return regions;
      }
      regions = regions + 1;
      pushToMap(map, rowIndex, cellIndex, regions);
    });
    return regions;
  }, 0);
  console.log(map);
  return regions;
  */
}
interface Map {
  [x:number]: YMap;
}
interface YMap {
  [y:number]: number|string;
}
function pushToMap(map:Map, row:number, cell:number, region:number|string) {
  if (!map[row]) {
    map[row] = {};
  }
  map[row][cell] = region;
  return map[row][cell];
}
