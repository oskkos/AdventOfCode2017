import { input as day13Input } from '../src/day13-input';
import * as day13 from '../src/day13';

const input = `0: 3
1: 2
4: 4
6: 4`;

test('example input', () => {
  expect(day13.task1(input)).toBe(24);
});
test('actual input', () => {
  expect(day13.task1(day13Input)).toBe(1624);
});

test('example input', () => {
  expect(day13.task2(input)).toBe(10);
});
test('actual input', () => {
  expect(day13.task2(day13Input)).toBe(1624);
});
