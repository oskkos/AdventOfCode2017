import { input as day17input } from '../src/day17-input';
import * as day17 from '../src/day17';

test('example input', () => {
  expect(day17.task1(3)).toBe(638);
});
test('actual input', () => {
  expect(day17.task1(day17input)).toBe(926);
});

test('actual input', () => {
  expect(day17.task2(day17input)).toBe(10150888);
});
