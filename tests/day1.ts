import { input as day1Input } from '../src/day1-input';
import * as day1 from '../src/day1';

test('1122 produces 3', () => {
  expect(day1.task1('1122')).toBe(3);
});
test('1111 produces 4', () => {
  expect(day1.task1('1111')).toBe(4);
});
test('1234 produces 0', () => {
  expect(day1.task1('1234')).toBe(0);
});
test('91212129 produces 9', () => {
  expect(day1.task1('91212129')).toBe(9);
});
test('actual input', () => {
  expect(day1.task1(day1Input)).toBe(1069);
});



test('1212 produces 6', () => {
  expect(day1.task2('1212')).toBe(6);
});
test('1221 produces 0', () => {
  expect(day1.task2('1221')).toBe(0);
});
test('123425 produces 4', () => {
  expect(day1.task2('123425')).toBe(4);
});
test('123123 produces 12', () => {
  expect(day1.task2('123123')).toBe(12);
});
test('12131415 produces 4', () => {
  expect(day1.task2('12131415')).toBe(4);
});
test('actual input', () => {
  expect(day1.task2(day1Input)).toBe(1268);
});
