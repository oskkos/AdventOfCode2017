import { input as day9input } from './day9-input';
export { task1, task2 };

/**
 * --- Day 9: Stream Processing ---
 *
 * A large stream blocks your path. According to the locals, it's not safe to cross the stream
 * at the moment because it's full of garbage. You look down at the stream; rather than water,
 * you discover that it's a stream of characters.
 *
 * You sit for a while and record part of the stream (your puzzle input). The characters represent
 * groups - sequences that begin with { and end with }. Within a group, there are zero or more
 * other things, separated by commas: either another group or garbage. Since groups can contain
 * other groups, a } only closes the most-recently-opened unclosed group - that is, they are
 * nestable. Your puzzle input represents a single, large group which itself contains many smaller
 * ones.
 *
 * Sometimes, instead of a group, you will find garbage. Garbage begins with < and ends with >.
 * Between those angle brackets, almost any character can appear, including { and }. Within garbage,
 * < has no special meaning.
 *
 * In a futile attempt to clean up the garbage, some program has canceled some of the characters
 * within it using !: inside garbage, any character that comes after ! should be ignored, including
 * <, >, and even another !.
* 
 * You don't see any characters that deviate from these rules. Outside garbage, you only find
 * well-formed groups, and garbage always terminates according to the rules above.
 *
 * Here are some self-contained pieces of garbage:
 * 
 * <>, empty garbage.
 * <random characters>, garbage containing random characters.
 * <<<<>, because the extra < are ignored.
 * <{!>}>, because the first > is canceled.
 * <!!>, because the second ! is canceled, allowing the > to terminate the garbage.
 * <!!!>>, because the second ! and the first > are canceled.
 * <{o"i!a,<{i<a>, which ends at the first >.
 * Here are some examples of whole streams and the number of groups they contain:
 * 
 * {}, 1 group.
 * {{{}}}, 3 groups.
 * {{},{}}, also 3 groups.
 * {{{},{},{{}}}}, 6 groups.
 * {<{},{},{{}}>}, 1 group (which itself contains garbage).
 * {<a>,<a>,<a>,<a>}, 1 group.
 * {{<a>},{<a>},{<a>},{<a>}}, 5 groups.
 * {{<!>},{<!>},{<!>},{<a>}}, 2 groups (since all but the last > are canceled).
 * Your goal is to find the total score for all groups in your input. Each group is assigned a
 * score which is one more than the score of the group that immediately contains it. (The outermost
 * group gets a score of 1.)
 * 
 * {}, score of 1.
 * {{{}}}, score of 1 + 2 + 3 = 6.
 * {{},{}}, score of 1 + 2 + 2 = 5.
 * {{{},{},{{}}}}, score of 1 + 2 + 3 + 3 + 3 + 4 = 16.
 * {<a>,<a>,<a>,<a>}, score of 1.
 * {{<ab>},{<ab>},{<ab>},{<ab>}}, score of 1 + 2 + 2 + 2 + 2 = 9.
 * {{<!!>},{<!!>},{<!!>},{<!!>}}, score of 1 + 2 + 2 + 2 + 2 = 9.
 * {{<a!>},{<a!>},{<a!>},{<ab>}}, score of 1 + 2 = 3.
 * What is the total score for all groups in your input?
 *
 * @param {string} input
 * @returns {number}
 */
function task1(input:string = day9input):number {
  const garbageCleaned:string = cleanGarbage(input);

  let sum:number = 0;
  let openParentheses:number = 0;
  for (let i = 0; i < garbageCleaned.length; i = i + 1) {
    const char = garbageCleaned.charAt(i);
    if (char === '{') {
      openParentheses = openParentheses + 1;
    } else if (char === '}') {
      sum = sum + openParentheses;
      openParentheses = openParentheses - 1;
    }
  }
  return sum;
}

/**
 * --- Part Two ---
 * 
 * Now, you're ready to remove the garbage.
 * 
 * To prove you've removed it, you need to count all of the characters within the garbage. The
 * leading and trailing < and > don't count, nor do any canceled characters or the ! doing the
 * canceling.
 * 
 * <>, 0 characters.
 * <random characters>, 17 characters.
 * <<<<>, 3 characters.
 * <{!>}>, 2 characters.
 * <!!>, 0 characters.
 * <!!!>>, 0 characters.
 * <{o"i!a,<{i<a>, 10 characters.
 * How many non-canceled characters are within the garbage in your puzzle input?
 *
 * @param {string} input
 * @returns {number}
 */
function task2(input:string = day9input):number {
  return cleanIgnored(input).length - cleanGarbage(input).length;
}

function cleanIgnored(input:string):string {
  let ignoredCleaned:string = '';
  for (let i = 0; i < input.length; i = i + 1) {
    const char:string = input.charAt(i);
    if (char === '!') { i = i + 1; } else { ignoredCleaned = ignoredCleaned + char; }
  }
  return ignoredCleaned;
}
function cleanGarbage(input:string):string {
  const ignoredCleaned:string = cleanIgnored(input);

  let garbageCleaned:string = '';
  for (let i = 0; i < ignoredCleaned.length; i = i + 1) {
    const char:string = ignoredCleaned.charAt(i);
    if (char === '<') {
      garbageCleaned = garbageCleaned + char;
      i = ignoredCleaned.indexOf('>', i) - 1;
    } else {
      garbageCleaned = garbageCleaned + char;
    }
  }
  return garbageCleaned;
}
