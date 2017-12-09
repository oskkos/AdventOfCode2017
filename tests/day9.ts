import { input as day9Input } from '../src/day9-input';
import * as day9 from '../src/day9';

test('example input 1', () => {
  expect(day9.task1('{}')).toBe(1);
});
test('example input 2', () => {
  expect(day9.task1('{{{}}}')).toBe(6);
});
test('example input 3', () => {
  expect(day9.task1('{{},{}}')).toBe(5);
});
test('example input 4', () => {
  expect(day9.task1('{{{},{},{{}}}}')).toBe(16);
});
test('example input 5', () => {
  expect(day9.task1('{<a>,<a>,<a>,<a>}')).toBe(1);
});
test('example input 6', () => {
  expect(day9.task1('{{<ab>},{<ab>},{<ab>},{<ab>}}')).toBe(9);
});
test('example input 7', () => {
  expect(day9.task1('{{<!!>},{<!!>},{<!!>},{<!!>}}')).toBe(9);
});
test('example input 8', () => {
  expect(day9.task1('{{<a!>},{<a!>},{<a!>},{<ab>}}')).toBe(3);
});
test('actual input', () => {
  expect(day9.task1(day9Input)).toBe(16869);
});

test('example input 1', () => {
  expect(day9.task2('<>')).toBe(0);
});
test('example input 2', () => {
  expect(day9.task2('<random characters>')).toBe(17);
});
test('example input 3', () => {
  expect(day9.task2('<<<<>')).toBe(3);
});
test('example input 4', () => {
  expect(day9.task2('<{!>}>')).toBe(2);
});
test('example input 5', () => {
  expect(day9.task2('<!!>')).toBe(0);
});
test('example input 6', () => {
  expect(day9.task2('<!!!>>')).toBe(0);
});
test('example input 7', () => {
  expect(day9.task2('<{o"i!a,<{i<a>')).toBe(10);
});
test('actual input', () => {
  expect(day9.task2(day9Input)).toBe(7284);
});
