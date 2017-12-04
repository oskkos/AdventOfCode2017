import { input as day4input } from './day4-input';
export { task1, task2 };

/**
 * --- Day 4: High-Entropy Passphrases ---
 *
 * A new system policy has been put in place that requires all accounts to use a passphrase instead
 * of simply a password. A passphrase consists of a series of words (lowercase letters)
 * separated by spaces.
 *
 * To ensure security, a valid passphrase must contain no duplicate words.
 *
 * For example:
 *
 * aa bb cc dd ee is valid.
 * aa bb cc dd aa is not valid - the word aa appears more than once.
 * aa bb cc dd aaa is valid - aa and aaa count as different words.
 * The system's full passphrase list is available as your puzzle input. How many passphrases
 * are valid?
 * @param {string} input
 * @returns {number}
 */
function task1(input:string = day4input):number {
  const rows = input.split('\n');
  const passphrases = rows.map(str => str.split(' '));
  const validPassPhrases = passphrases.filter(arr => arr.every(unique));
  return validPassPhrases.length;
}
function task2(input:string = day4input):number {
  return 0;
}
function unique(item:string, i:number, arr:string[]):boolean {
  return arr.indexOf(item) === i;
}
