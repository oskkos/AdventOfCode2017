import { input as day11input } from './day11-input';
export { task1, task2 };

/**
 * --- Day 11: Hex Ed ---
 *
 * Crossing the bridge, you've barely reached the other side of the stream when a program comes
 * up to you, clearly in distress. "It's my child process," she says, "he's gotten lost in an
 * infinite grid!"
 *
 * Fortunately for her, you have plenty of experience with infinite grids.
 *
 * Unfortunately for you, it's a hex grid.
 *
 * The hexagons ("hexes") in this grid are aligned such that adjacent hexes can be found to the
 * north, northeast, southeast, south, southwest, and northwest:
 *
 *   \ n  /
 * nw +--+ ne
 *   /    \
 * -+      +-
 *   \    /
 * sw +--+ se
 *   / s  \
 * You have the path the child process took. Starting where he started, you need to determine the
 * fewest number of steps required to reach him. (A "step" means to move from the hex you are in
 * to any adjacent hex.)
 *
 * For example:
 *
 * ne,ne,ne is 3 steps away.
 * ne,ne,sw,sw is 0 steps away (back where you started).
 * ne,ne,s,s is 2 steps away (se,se).
 * se,sw,se,sw,sw is 3 steps away (s,s,sw).
 * @param {string} input
 * @returns {number}
 */

interface Coords {
  row: number;
  col: number;
}
interface Cube {
  x: number;
  y: number;
  z: number;
}

function task1(input:string = day11input):number {
  // https://www.redblobgames.com/grids/hexagons/ ("odd-q" vertical layout)
  const coords:Coords = { row: 0, col: 0 };
  input.split(',').forEach((step:string) => {
    if (step === 'n') {
      coords.row = coords.row - 1;
    } else if (step === 's') {
      coords.row = coords.row + 1;
    } else if (step === 'ne') {
      coords.col = coords.col + 1;
      if (coords.col % 2 !== 0) {
        coords.row = coords.row - 1;
      }
    } else if (step === 'nw') {
      coords.col = coords.col - 1;
      if (coords.col % 2 !== 0) {
        coords.row = coords.row - 1;
      }
    } else if (step === 'se') {
      coords.col = coords.col + 1;
      if (coords.col % 2 === 0) {
        coords.row = coords.row + 1;
      }
    } else if (step === 'sw') {
      coords.col = coords.col - 1;
      if (coords.col % 2 === 0) {
        coords.row = coords.row + 1;
      }
    } else {
      throw new Error(`Unknown step: ${step}`);
    }
  });
  return cubeDistance(oddr_to_cube(coords));
}

function oddr_to_cube(hex:Coords):Cube {
  const x:number = hex.row - (hex.col - (hex.col & 1)) / 2;
  const z:number = hex.col;
  const y:number = -x - z;
  return { x, y, z };
}
function cubeDistance(cube:Cube):number {
  return (Math.abs(cube.x) + Math.abs(cube.y) + Math.abs(cube.z)) / 2;
}

function task2(input:string = day11input):number {
  return +input;
}
