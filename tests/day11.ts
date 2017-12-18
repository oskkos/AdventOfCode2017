import { input as day11Input } from '../src/day11-input';
import * as day11 from '../src/day11';

test('example input 1', () => {
  expect(day11.task1('ne,ne,ne')).toBe(3);
});
test('example input 2', () => {
  expect(day11.task1('ne,ne,sw,sw')).toBe(0);
});
test('example input 3', () => {
  expect(day11.task1('ne,ne,s,s')).toBe(2);
});
test('example input 4', () => {
  expect(day11.task1('se,sw,se,sw,sw')).toBe(3);
});
test('actual input', () => {
  expect(day11.task1(day11Input)).toBe(650);
});

test('actual input', () => {
  expect(day11.task2(day11Input)).toBe(1465);
});
