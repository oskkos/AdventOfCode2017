import { input as day16input } from './day16-input';
export { task1, task2 };

/**
 * --- Day 16: Permutation Promenade ---
 * You come upon a very unusual sight; a group of programs here appear to be dancing.
 * 
 * There are sixteen programs in total, named a through p. They start by standing in a line:
 *  a stands in position 0, b stands in position 1, and so on until p, which stands in
 *  position 15.
 *
 * The programs' dance consists of a sequence of dance moves:
 *
 * Spin, written sX, makes X programs move from the end to the front, but maintain their
 *  order otherwise. (For example, s3 on abcde produces cdeab).
 * Exchange, written xA/B, makes the programs at positions A and B swap places.
 * Partner, written pA/B, makes the programs named A and B swap places.
 * For example, with only five programs standing in a line (abcde), they could do the
 *  following dance:
 *
 * s1, a spin of size 1: eabcd.
 * x3/4, swapping the last two programs: eabdc.
 * pe/b, swapping programs e and b: baedc.
 * After finishing their dance, the programs end up in order baedc.
 *
 * You watch the dance for a while and record their dance moves (your puzzle input). In
 *  what order are the programs standing after their dance?
 */
function task1(
  input:string = day16input,
  programStr:string = 'abcdefghijklmnop',
  loops:number = 1,
):string {
  const programs:string[] = programStr.split('');
  const moves = getMoves(input, programs.length);
  const resolved = {};
  for (let i = 0; i < loops; i = i + 1) {
    moves.forEach(move => doTheMove(move, programs));
    if (programs.join('') === programStr) {
      const cycleLength:number = i + 1;
      const cycleLoops:number = Math.floor(loops / cycleLength - 1);
      i = i + (cycleLength * cycleLoops);
    }
  }
  return programs.join('');
}
function doTheMove(moveMap:MoveMap, programs:string[]) {
  if (moveMap.move === 's') {
    programs.unshift(...programs.splice(programs.length - moveMap.skipSize, moveMap.skipSize));
  } else if (moveMap.move === 'x') {
    swap(programs, moveMap.from, moveMap.to);
  } else if (moveMap.move === 'p') {
    swap(programs, programs.indexOf(moveMap.fromChar), programs.indexOf(moveMap.toChar));
  } else {
    throw new Error(`Unsupported move ${moveMap.move}`);
  }
}
function getMoves(input:string, len:number):MoveMap[] {
  return input.split(',').map((moveSequence) => {
    const move:string = moveSequence.substr(0, 1);
    const moveMap:MoveMap = { move };
    moveMap.move = move;
    if (move === 's') {
      moveMap.skipSize = +moveSequence.substr(1);
    } else if (move === 'x') {
      const [from, to] = moveSequence.substr(1).split('/').map(v => +v);
      moveMap.from = from;
      moveMap.to = to;
    } else if (move === 'p') {
      const [fromChar, toChar] = moveSequence.substr(1).split('/');
      moveMap.fromChar = fromChar;
      moveMap.toChar = toChar;
    }
    return moveMap;
  });
}
interface MoveMap {
  move: string;
  skipSize?: number;
  from?: number;
  to?: number;
  fromChar?: string;
  toChar?: string;
}
function swap(list:string[], iA:number, iB:number) {
  [list[iA], list[iB]] = [list[iB], list[iA]];
}
interface Indexes {
  [key:string]: number;
}
/**
 * --- Part Two ---
 * Now that you're starting to get a feel for the dance moves, you turn your attention to
 *  the dance as a whole.
 *
 * Keeping the positions they ended up in from their previous dance, the programs perform
 *  it again and again: including the first dance, a total of one billion (1000000000) times.
 *
 * In the example above, their second dance would begin with the order baedc, and use the
 *  same dance moves:
 *
 * s1, a spin of size 1: cbaed.
 * x3/4, swapping the last two programs: cbade.
 * pe/b, swapping programs e and b: ceadb.
 * In what order are the programs standing after their billion dances?
 */
function task2(
  input:string = day16input,
  programStr:string = 'abcdefghijklmnop',
):string {
  return task1(input, programStr, 1000000000);
}
