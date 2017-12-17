import { input as day16input } from '../src/day16-input';
import * as day16 from '../src/day16';

test('example input', () => {
  expect(day16.task1('s1,x3/4,pe/b', 'abcde')).toBe('baedc');
});
test('actual input', () => {
  expect(day16.task1(day16input)).toBe('ceijbfoamgkdnlph');
});
test('actual input', () => {
  expect(day16.task2(day16input)).toBe('pnhajoekigcbflmd');
});
