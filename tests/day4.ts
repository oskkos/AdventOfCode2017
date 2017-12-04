import { input as day4Input } from '../src/day4-input';
import * as day4 from '../src/day4';

test('aa bb cc dd ee is valid', () => {
  expect(day4.task1('aa bb cc dd ee')).toBe(1);
});
test('aa bb cc dd aa is not valid', () => {
  expect(day4.task1('aa bb cc dd aa')).toBe(0);
});
test('aa bb cc dd aaa is valid', () => {
  expect(day4.task1('aa bb cc dd aaa')).toBe(1);
});
test('example inputs', () => {
  expect(day4.task1('aa bb cc dd ee\naa bb cc dd aa\naa bb cc dd aaa')).toBe(2);
});
test('actual inputs', () => {
  expect(day4.task1(day4Input)).toBe(451);
});
