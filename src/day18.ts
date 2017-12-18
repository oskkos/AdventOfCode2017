import { input as day18input } from './day18-input';
export { task1 };

interface Command {
  cmd: string;
  target: string;
  value: string;
}
interface Values {
  [key:string]: number;
}
function task1(input:string = day18input):number {
  const sends:number[] = runner(input);
  console.log(sends.length);
  return sends[sends.length - 1];
}
function runner(input:string):number[] {
  const values:Values = {};
  const commands:Command[] = getCommands(input);
  const sends:number[] = [];
  for (let i = 0; i < commands.length; i = i + 1) {
    const c:Command = commands[i];
    if (c.cmd === 'snd') {
      sends.push(getCurrentValue(values, c.target));
    } else if (c.cmd === 'set') {
      values[c.target] = getNewValue(values, c.value);
    } else if (c.cmd === 'add') {
      values[c.target] = getCurrentValue(values, c.target) + getNewValue(values, c.value);
    } else if (c.cmd === 'mul') {
      values[c.target] = getCurrentValue(values, c.target) * getNewValue(values, c.value);
    } else if (c.cmd === 'mod') {
      values[c.target] = getCurrentValue(values, c.target) % getNewValue(values, c.value);
    } else if (c.cmd === 'rcv') {
      if (getCurrentValue(values, c.target) === 0) {
        continue;
      }
      return sends;
    } else if (c.cmd === 'jgz') {
      if (getCurrentValue(values, c.target) !== 0) {
        i = i + getNewValue(values, c.value) - 1;
      }
    } else {
      throw new Error(`Unsupported cmd ${c.cmd}`);
    }
  }
  throw new Error('Nothing received');
}
function getCurrentValue(values:Values, target:string):number {
  return typeof values[target] !== 'undefined' ? values[target] : 0;
}

function getNewValue(values:Values, value:string):number {
  if (value.match('[a-z]') !== null) {
    return (typeof values[value] !== 'undefined') ? values[value] : 0;
  }
  return +value;
}
function getCommands(input:string):Command[] {
  return input.split('\n').map((command) => {
    const chunks:string[] = command.split(' ');
    return { cmd: chunks[0], target: chunks[1], value: chunks[2] };
  });
}
