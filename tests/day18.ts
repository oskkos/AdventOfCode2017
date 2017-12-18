import { input as day18input } from '../src/day18-input';
import * as day18 from '../src/day18';

const input:string = `set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2`;

test('example input', () => {
  expect(day18.task1(input)).toBe(4);
});
test('actual input', () => {
  expect(day18.task1(day18input)).toBe(1187);
});
