import { input as day6Input } from '../src/day6-input';
import * as day6 from '../src/day6';

test('example input', () => {
  const input = '0\t2\t7\t0';
  expect(day6.task1(input)).toBe(5);
});
test('actual input', () => {
  expect(day6.task1(day6Input)).toBe(4074);
});

test('example input', () => {
  const input = '0\t2\t7\t0';
  expect(day6.task2(input)).toBe(4);
});
test('actual input', () => {
  expect(day6.task2(day6Input)).toBe(2793);
});
