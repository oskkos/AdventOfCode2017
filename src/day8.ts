import { input as day8input } from './day8-input';
export { task1, task2 };

/**
 * --- Day 8: I Heard You Like Registers ---
 *
 * You receive a signal directly from the CPU. Because of your recent assistance with jump
 * instructions, it would like you to compute the result of a series of unusual register
 * instructions.
 *
 * Each instruction consists of several parts: the register to modify, whether to increase or
 * decrease that register's value, the amount by which to increase or decrease it, and a
 * condition. If the condition fails, skip the instruction without modifying the register.
 * The registers all start at 0. The instructions look like this:
 *
 * b inc 5 if a > 1
 * a inc 1 if b < 5
 * c dec -10 if a >= 1
 * c inc -20 if c == 10
 * These instructions would be processed as follows:
 *
 * Because a starts at 0, it is not greater than 1, and so b is not modified.
 * a is increased by 1 (to 1) because b is less than 5 (it is 0).
 * c is decreased by -10 (to 10) because a is now greater than or equal to 1 (it is 1).
 * c is increased by -20 (to -10) because c is equal to 10.
 * After this process, the largest value in any register is 1.
 * 
 * You might also encounter <= (less than or equal to) or != (not equal to). However, the CPU
 * doesn't have the bandwidth to tell you what all the registers are named, and leaves that to
 * you to determine.
 *
 * What is the largest value in any register after completing the instructions in your puzzle input?
 *
 * @param {string} input
 * @returns {number}
 */
function task1(input:string = day8input):number {
  return runner(input)[0];
  
}

/**
 * --- Part Two ---

 * To be safe, the CPU also needs to know the highest value held in any register during this
 * process so that it can decide how much memory to allocate to these operations. For example,
 * in the above instructions, the highest value ever held was 10 (in register c after the third
 * instruction was evaluated).
 *
 *  @param {string} input
 * @returns {number}
 */
function task2(input:string = day8input):number {
  return runner(input)[1];
}

function runner(input:string):number[] {
  interface Registry {
    [key:string]: number;
  }
  const rows:string[] = input.split('\n');
  const registry:Registry = {};
  rows.forEach((row:string) => {
    registry[row.split(' ')[0]] = 0;
  });

  let max:number = 0;
  rows.forEach((row) => {
    const operation = row.split('if')[0].trim();
    const condition = row.split('if')[1].trim();
  
    const registryPosition = condition.split(' ')[0].trim();
    const operand = condition.split(' ')[1].trim();
    const value:number = +condition.split(' ')[2].trim();
    /* tslint:disable-next-line:no-eval */
    if (eval(`registry['${registryPosition}'] ${operand} ${value}`)) {
      const modifiedRegistryPosition:string = operation.split(' ')[0].trim();
      const op:string = operation.split(' ')[1].trim();
      const amount:number = + operation.split(' ')[2].trim();

      if (op === 'inc') {
        registry[modifiedRegistryPosition] = registry[modifiedRegistryPosition] + amount;
      } else {
        registry[modifiedRegistryPosition] = registry[modifiedRegistryPosition] - amount;
      }
      if (registry[modifiedRegistryPosition] > max) {
        max = registry[modifiedRegistryPosition];
      }
    }
  });
  let finalMax:number = 0;
  Object.keys(registry).forEach((key) => {
    if (registry[key] > finalMax) {
      finalMax = registry[key];
    }
  });  
  return [finalMax, max];
}
