import { input as day2Input } from '../src/day2-input';
import * as day2 from '../src/day2';

test('example input', () => {
  const input = '5\t1\t9\t5\n7\t5\t3\n2\t4\t6\t8';
  expect(day2.task1(input)).toBe(18);
});
test('actual input', () => {
  expect(day2.task1(day2Input)).toBe(32020);
});

test('example input', () => {
  const input = '5\t9\t2\t8\n9\t4\t7\t3\n3\t8\t6\t5';
  expect(day2.task2(input)).toBe(9);
});
test('actual input', () => {
  expect(day2.task2(day2Input)).toBe(236);
});
