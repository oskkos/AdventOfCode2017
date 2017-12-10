import * as day1 from './day1' ;
import * as day2 from './day2' ;
import * as day3 from './day3' ;
import * as day4 from './day4' ;
import * as day5 from './day5' ;
import * as day6 from './day6' ;
import * as day7 from './day7' ;
import * as day8 from './day8' ;
import * as day9 from './day9' ;
import * as day10 from './day10' ;

const list = document.createElement('ul');
document.body.appendChild(list);

list.appendChild(getItem('Day 1 - Task 1', day1.task1));
list.appendChild(getItem('Day 1 - Task 2', day1.task2));
list.appendChild(getItem('Day 2 - Task 1', day2.task1));
list.appendChild(getItem('Day 2 - Task 2', day2.task2));
list.appendChild(getItem('Day 3 - Task 1', day3.task1));
list.appendChild(getItem('Day 3 - Task 2', day3.task2));
list.appendChild(getItem('Day 4 - Task 1', day4.task1));
list.appendChild(getItem('Day 4 - Task 2', day4.task2));
list.appendChild(getItem('Day 5 - Task 1', day5.task1));
list.appendChild(getItem('Day 5 - Task 2', day5.task2));
list.appendChild(getItem('Day 6 - Task 1', day6.task1));
list.appendChild(getItem('Day 6 - Task 2', day6.task2));
list.appendChild(getItem('Day 7 - Task 1', day7.task1));
list.appendChild(getItem('Day 7 - Task 2', day7.task2));
list.appendChild(getItem('Day 8 - Task 1', day8.task1));
list.appendChild(getItem('Day 8 - Task 2', day8.task2));
list.appendChild(getItem('Day 9 - Task 1', day9.task1));
list.appendChild(getItem('Day 9 - Task 2', day9.task2));
list.appendChild(getItem('Day 10 - Task 1', day10.task1));
list.appendChild(getItem('Day 10 - Task 2', day10.task2));

function getItem(label:string, func:Function):HTMLLIElement {
  const item = document.createElement('li');
  const link:HTMLAnchorElement = document.createElement('a');
  link.textContent = label;
  link.href = '#';
  link.onclick = () => { alert(func()); };
  item.appendChild(link);
  return item;
}
