import { input as day8Input } from '../src/day8-input';
import * as day8 from '../src/day8';

const input = `b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`;

test('example input', () => {
  expect(day8.task1(input)).toBe(1);
});
test('actual input', () => {
  expect(day8.task1(day8Input)).toBe(6611);
});

test('example input', () => {
  expect(day8.task2(input)).toBe(10);
});
test('actual input', () => {
  expect(day8.task2(day8Input)).toBe(6619);
});
