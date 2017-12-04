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
function unique(item:string, i:number, arr:string[]):boolean {
  return arr.indexOf(item) === i;
}

/**
 * --- Part Two ---
 *
 *  For added security, yet another system policy has been put in place. Now, a valid passphrase
 *  must contain no two words that are anagrams of each other - that is, a passphrase is invalid
 *  if any word's letters can be rearranged to form any other word in the passphrase.
 *
 *  For example:
 *
 * abcde fghij is a valid passphrase.
 * abcde xyz ecdab is not valid - the letters from the third word can be rearranged to form the
 * first word.
 * a ab abc abd abf abj is a valid passphrase, because all letters need to be used when forming
 * another word.
 * iiii oiii ooii oooi oooo is valid.
 * oiii ioii iioi iiio is not valid - any of these words can be rearranged to form any other word.
 * Under this new system policy, how many passphrases are valid?
 * @param {string} input
 * @returns {number}
 */
function task2(input:string = day4input):number {
  const rows = input.split('\n');
  const passphrases = rows.map(str => str.split(' '));
  const validPassPhrases = passphrases.filter(arr => arr.every(uniqueAnagram));
  return validPassPhrases.length;
}
function stringSort(str:string):string {
  return str.split('').sort().join('');
}
function uniqueAnagram(item:string, i:number, arr:string[]):boolean {
  const sorted = stringSort(item);
  for (let j = i + 1; j < arr.length; j = j + 1) {
    const candidate = stringSort(arr[j]);
    if (sorted === candidate) {
      return false;
    }
  }
  return true;
}
