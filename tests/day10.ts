import { input as day10Input } from '../src/day10-input';
import * as day10 from '../src/day10';

test('example input 1', () => {
  expect(day10.task1('3,4,1,5', 5)).toBe(12);
});
test('actual input', () => {
  expect(day10.task1(day10Input)).toBe(15990);
});

test('example input 1', () => {
  expect(day10.task2('')).toBe('a2582a3a0e66e6e86e3812dcb672a272');
});
test('example input 2', () => {
  expect(day10.task2('AoC 2017')).toBe('33efeb34ea91902bb2f59c9920caa6cd');
});
test('example input 3', () => {
  expect(day10.task2('1,2,3')).toBe('3efbe78a8d82f29979031a4aa0b16a9d');
});
test('example input 4', () => {
  expect(day10.task2('1,2,4')).toBe('63960835bcdc130f0b66d7ff4f6a5a8e');
});
test('actual input', () => {
  expect(day10.task2(day10Input)).toBe('90adb097dd55dea8305c900372258ac6');
});
