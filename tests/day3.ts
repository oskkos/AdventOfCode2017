import { input as day3Input } from '../src/day3-input';
import * as day3 from '../src/day3';

test('Data from square 1 is carried 0 steps', () => {
  expect(day3.task1(1)).toBe(0);
});
test('Data from square 12 is carried 3 steps', () => {
  expect(day3.task1(12)).toBe(3);
});
test('Data from square 23 is carried 2 steps', () => {
  expect(day3.task1(23)).toBe(2);
});
test('Data from square 1024 is carried 31 steps', () => {
  expect(day3.task1(1024)).toBe(31);
});
test('Actual input', () => {
  expect(day3.task1(day3Input)).toBe(326);
});

test('Larger than 1', () => {
  expect(day3.task2(1)).toBe(2);
});
test('Larger than 2', () => {
  expect(day3.task2(2)).toBe(4);
});
test('Larger than 5', () => {
  expect(day3.task2(5)).toBe(10);
});
test('Larger than 130', () => {
  expect(day3.task2(130)).toBe(133);
});
test('Larger than 777', () => {
  expect(day3.task2(777)).toBe(806);
});
test('Actual input', () => {
  expect(day3.task2(day3Input)).toBe(363010);
});
