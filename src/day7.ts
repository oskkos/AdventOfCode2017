import { input as day7input } from './day7-input';
export { task1, task2 };

/**
 * --- Day 7: Recursive Circus ---
 *
 * Wandering further through the circuits of the computer, you come upon a tower of programs that
 * have gotten themselves into a bit of trouble. A recursive algorithm has gotten out of hand,
 * and now they're balanced precariously in a large tower.
 *
 * One program at the bottom supports the entire tower. It's holding a large disc, and on the disc
 * are balanced several more sub-towers. At the bottom of these sub-towers, standing on the bottom
 * disc, are other programs, each holding their own disc, and so on. At the very tops of these 
 * sub-sub-sub-...-towers, many programs stand simply keeping the disc below them balanced but with
 * no disc of their own.
 *
 * You offer to help, but first you need to understand the structure of these towers. You ask each
 * program to yell out their name, their weight, and (if they're holding a disc) the names of the
 * programs immediately above them balancing on that disc. You write this information down (your
 * puzzle input). Unfortunately, in their panic, they don't do this in an orderly fashion; by the
 * time you're done, you're not sure which program gave which information.
 *
 * For example, if your list is the following:
 *
 * pbga (66)
 * xhth (57)
 * ebii (61)
 * havc (66)
 * ktlj (57)
 * fwft (72) -> ktlj, cntj, xhth
 * qoyq (66)
 * padx (45) -> pbga, havc, qoyq
 * tknk (41) -> ugml, padx, fwft
 * jptl (61)
 * ugml (68) -> gyxo, ebii, jptl
 * gyxo (61)
 * cntj (57)
 * ...then you would be able to recreate the structure of the towers that looks like this:
 * 
 *                 gyxo
 *               /     
 *          ugml - ebii
 *        /      \     
 *       |         jptl
 *       |        
 *       |         pbga
 *      /        /
 * tknk --- padx - havc
 *      \        \
 *       |         qoyq
 *       |             
 *       |         ktlj
 *        \      /     
 *          fwft - cntj
 *               \     
 *                 xhth
 *
 * In this example, tknk is at the bottom of the tower (the bottom program), and is holding up
 * ugml, padx, and fwft. Those programs are, in turn, holding up other programs; in this example,
 * none of those programs are holding up any other programs, and are all the tops of their own
 * towers. (The actual tower balancing in front of you is much larger.)
 *
 *  Before you're ready to help them, you need to make sure your information is correct. What is
 * the name of the bottom program?
 *
 * @param {string} input
 * @returns {number}
 */
function task1(input:string = day7input):string {
  interface Items {
    [key:string]: string;
  }
  
  const rows:string[] = input.split('\n');
  const items:Items = rows.reduce((obj:Items, row) => {
    obj[row.split('(')[0].trim()] = '';
    return obj;
  }, {});

  rows.forEach((row) => {
    const parent = row.split('(')[0];
    const children:string = row.split(' -> ')[1];
    if (typeof children === 'undefined') {
      return;
    }

    children.split(',').forEach((child) => {
      items[child.trim()] = parent;
    });
  });

  const root = Object.keys(items).filter(item => items[item] === '')[0];
  return root;
}

/**
 * --- Part Two ---
 *
 * The programs explain the situation: they can't get down. Rather, they could get down, if they
 * weren't expending all of their energy trying to keep the tower balanced. Apparently, one
 * program has the wrong weight, and until it's fixed, they're stuck here.
 *
 * For any program holding a disc, each program standing on that disc forms a sub-tower. Each of
 * those sub-towers are supposed to be the same weight, or the disc itself isn't balanced. The
 * weight of a tower is the sum of the weights of the programs in that tower.
 *
 * In the example above, this means that for ugml's disc to be balanced, gyxo, ebii, and jptl must
 * all have the same weight, and they do: 61.
 *
 * However, for tknk to be balanced, each of the programs standing on its disc and all programs
 * above it must each match. This means that the following sums must all be the same:
 *
 * ugml + (gyxo + ebii + jptl) = 68 + (61 + 61 + 61) = 251
 * padx + (pbga + havc + qoyq) = 45 + (66 + 66 + 66) = 243
 * fwft + (ktlj + cntj + xhth) = 72 + (57 + 57 + 57) = 243
 * As you can see, tknk's disc is unbalanced: ugml's stack is heavier than the other two. Even
 * though the nodes above ugml are balanced, ugml itself is too heavy: it needs to be 8 units
 * lighter for its stack to weigh 243 and keep the towers balanced. If this change were made,
 * its weight would be 60.
 *
 * Given that exactly one program is the wrong weight, what would its weight need to be to balance
 *  the entire tower?
 * @param {string} input
 * @returns {number}
 */
function task2(input:string = day7input):number {
  const items:Items = input.split('\n').reduce((obj:Items, row) => {
    const item:string = row.split('(')[0].trim();
    const weight:number = +row.split('(')[1].split(')')[0];
    const childrenStr:string = row.split(' -> ')[1];
    const children = (typeof childrenStr === 'undefined') ?
     [] :  childrenStr.split(',').map(s => s.trim());

    obj[item] = { weight, children };
    return obj;
  }, {});

  return resolve(items, task1(input));
}
function resolve(items:Items, itemName:string, diff:number = 0):number {
  interface Buckets {
    [weight:number]: string[];
  }
  const buckets:Buckets = {};
  items[itemName].children.forEach((child) => {
    const childWeight = childWeights(items, child, 0);
    if (typeof buckets[childWeight] === 'undefined') {
      buckets[childWeight] = [];
    }
    buckets[childWeight].push(child);
  });
  const weights:number[] = Object.keys(buckets).map(w => +w);
  if (weights.length > 1) {
    const weight:number = weights.filter(weight => buckets[weight].length === 1)[0];
    return resolve(items, buckets[weight][0], Math.max(...weights) - Math.min(...weights));
  }
  return items[itemName].weight - diff;
}

function childWeights(items:Items, child:string, weight:number):number {
  let accumulatedWeight:number = weight + items[child].weight;
  items[child].children.forEach((subchild) => {
    accumulatedWeight = childWeights(items, subchild, accumulatedWeight);
  });
  return accumulatedWeight;
}
interface Item {
  weight: number;
  children: string[];
}
interface Items {
  [key:string]: Item;
}
