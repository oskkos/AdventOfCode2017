import { input as day12Input } from '../src/day12-input';
import * as day12 from '../src/day12';

const input = `0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`;

test('example input', () => {
  expect(day12.task1(input)).toBe(6);
});
test('actual input', () => {
  expect(day12.task1(day12Input)).toBe(115);
});

test('example input', () => {
  expect(day12.task2(input)).toBe(2);
});
test('actual input', () => {
  expect(day12.task2(day12Input)).toBe(221);
});
