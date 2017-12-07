import { input as day7Input } from '../src/day7-input';
import * as day7 from '../src/day7';

const input = `pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)`;

test('example input', () => {
  expect(day7.task1(input)).toBe('tknk');
});
test('actual input', () => {
  expect(day7.task1(day7Input)).toBe('hmvwl');
});

test('example input', () => {
  expect(day7.task2(input)).toBe(60);
});
test('actual input', () => {
  expect(day7.task2(day7Input)).toBe(1853);
});
