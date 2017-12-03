import * as day1 from './day1' ;
import * as day2 from './day2' ;
import * as day3 from './day3' ;

const list = document.createElement('ul');
document.body.appendChild(list);

list.appendChild(getItem('Day 1 - Task 1', day1.task1));
list.appendChild(getItem('Day 1 - Task 2', day1.task2));
list.appendChild(getItem('Day 2 - Task 1', day2.task1));
list.appendChild(getItem('Day 2 - Task 2', day2.task2));
list.appendChild(getItem('Day 3 - Task 1', day3.task1));
list.appendChild(getItem('Day 3 - Task 2', day3.task2));

function getItem(label:string, func:Function):HTMLLIElement {
  const item = document.createElement('li');
  const link:HTMLAnchorElement = document.createElement('a');
  link.textContent = label;
  link.href = '#';
  link.onclick = () => { alert(func()); };
  item.appendChild(link);
  return item;
}
