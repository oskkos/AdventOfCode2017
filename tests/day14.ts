import { input as day14Input } from '../src/day14-input';
import * as day14 from '../src/day14';

test('example input', () => {
  expect(day14.task1('flqrgnkx')).toBe(8108);
});
test('actual input', () => {
  expect(day14.task1(day14Input)).toBe(8074);
});

test('example input', () => {
  expect(day14.task2('flqrgnkx')).toBe(1242);
});
test('actual input', () => {
  expect(day14.task2(day14Input)).toBe(1212);
});
