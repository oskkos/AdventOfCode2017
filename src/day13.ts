import { input as day13input } from './day13-input';
export { task1, task2 };

/**
 * --- Day 13: Packet Scanners ---
 * You need to cross a vast firewall. The firewall consists of several layers, each with a security
 * scanner that moves back and forth across the layer. To succeed, you must not be detected
 * by a scanner.
 * 
 * By studying the firewall briefly, you are able to record (in your puzzle input) the depth of each
 * layer and the range of the scanning area for the scanner within it, written as depth: range. Each
 * layer has a thickness of exactly 1. A layer at depth 0 begins immediately inside the firewall; a
 * layer at depth 1 would start immediately after that.
 * 
 * For example, suppose you've recorded the following:
 * 0: 3
 * 1: 2
 * 4: 4
 * 6: 4
 * This means that there is a layer immediately inside the firewall (with range 3), a second layer
 * immediately after that (with range 2), a third layer which begins at depth 4 (with range 4),
 * and a fourth layer which begins at depth 6 (also with range 4).
 * Within each layer, a security scanner moves back and forth within its range. Each security
 * scanner starts at the top and moves down until it reaches the bottom, then moves up until it
 * reaches the top, and repeats. A security scanner takes one picosecond to move one step. 
 * Your plan is to hitch a ride on a packet about to move through the firewall. The packet will
 * travel along the top of each layer, and it moves at one layer per picosecond. Each picosecond,
 * the packet moves one layer forward (its first move takes it into layer 0), and then the scanners
 * move one step. If there is a scanner at the top of the layer as your packet enters it, you are
 * caught. (If a scanner moves into the top of its layer while you are there, you are not caught:
 * it doesn't have time to notice you before you leave.) 
 * In this situation, you are caught in layers 0 and 6, because your packet entered the layer when
 * its scanner was at the top when you entered it. You are not caught in layer 1, since the scanner
 * moved into the top of the layer once you were already there.
 * 
 * The severity of getting caught on a layer is equal to its depth multiplied by its range. (Ignore
 * layers in which you do not get caught.) The severity of the whole trip is the sum of these
 * values. In the example above, the trip severity is 0*3 + 6*4 = 24.
 * 
 * Given the details of the firewall you've recorded, if you leave immediately, what is the severity
 * of your whole trip?
 * @param {string} input
 * @returns {number}
 */
function task1(input:string = day13input):number {
  const scanners:Scanners = getScanners(input);
  const caught:number[] = runner(scanners);
  return caught.reduce((sum, key) => { return sum + key * scanners[key].size; }, 0);
}
function runner(scanners:Scanners):number[] {
  const layers:number[] = Object.keys(scanners).map(k => +k);
  const caught:number[] = [];
  const max:number = layers[layers.length - 1];
  
  for (let i = 0; i <= max; i = i + 1) {
    if (typeof scanners[i] !== 'undefined' && scanners[i].position === 0) {
      caught.push(i);
    }
    moveScanners(scanners);
  }
  return caught;
}
function getScanners(input:string):Scanners {
  const scanners:Scanners = {};
  input.split('\n').forEach((row) => {
    scanners[+row.split(':')[0]] = {
      size: +row.split(':')[1],
      position: 0,
      direction: Direction.Down,
    };
  });
  return scanners;
}
function moveScanners(scanners:Scanners) {
  const layers:number[] = Object.keys(scanners).map(k => +k);
  layers.forEach(layer => moveScanner(scanners[layer]));
}
function moveScanner(scanner:Scanner) {
  if (scanner.size === 0) {
    return;
  }
  if (scanner.direction === Direction.Up && scanner.position === 0) {
    scanner.direction = Direction.Down;
  } 
  if (scanner.direction === Direction.Down && scanner.position === (scanner.size - 1)) {
    scanner.direction = Direction.Up;
  }
  scanner.position = scanner.position + scanner.direction;
}
function clone(scanners:Scanners):Scanners {
  const scannersOut:Scanners = {};
  Object.keys(scanners).map(k => +k).forEach((key) => {
    const scanner:Scanner = scanners[key];
    scannersOut[key] = {
      size: scanner.size,
      position: scanner.position,
      direction: scanner.direction,
    };
  });
  return scannersOut;
}

/**
 * --- Part Two ---
 * Now, you need to pass through the firewall without being caught - easier said than done.
 *
 * You can't control the speed of the packet, but you can delay it any number of picoseconds.
 * For each picosecond you delay the packet before beginning your trip, all security scanners
 * move one step. You're not in the firewall during this time; you don't enter layer 0 until
 * you stop delaying the packet.
 *
 * In the example above, if you delay 10 picoseconds (picoseconds 0 - 9), you won't get caught:
 */
function task2(input:string = day13input):number {
  let delay:number = 0;
  const scanners:Scanners = getScanners(input);
  const layers:number[] = Object.keys(scanners).map(k => +k);
  const max:number = layers[layers.length - 1];

  while (true) {
    if (delay > 0) {
      moveScanners(scanners);
    }
    const scannersClone = clone(scanners);
    let caught:boolean = false;

    for (let i = 0; i <= max; i = i + 1) {
      if (typeof scannersClone[i] !== 'undefined' && scannersClone[i].position === 0) {
        caught = true;
        break;
      }
      moveScanners(scannersClone);
    }
    if (!caught) {
      return delay;
    }
    delay = delay + 1;
  }
}

interface Scanners {
  [layer:number]: Scanner;
}
interface Scanner {
  size: number;
  position: number;
  direction: Direction;
}
enum Direction {
  Down = 1,
  Up = -1,
}

