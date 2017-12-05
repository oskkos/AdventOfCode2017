import { input as day5Input } from '../src/day5-input';
import * as day5 from '../src/day5';

test('example input', () => {
  const input = '0\n3\n0\n1\n-3';
  expect(day5.task1(input)).toBe(5);
});
test('actual input', () => {
  expect(day5.task1(day5Input)).toBe(388611);
});

test('example input', () => {
  const input = '0\n3\n0\n1\n-3';
  expect(day5.task2(input)).toBe(10);
});
test('actual input', () => {
  expect(day5.task2(day5Input)).toBe(27763113);
});
