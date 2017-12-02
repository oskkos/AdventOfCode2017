import * as day1 from './day1' ;

const list = document.createElement('ul');
document.body.appendChild(list);

list.appendChild(getItem('Day 1 - Task 1', day1.task1));
list.appendChild(getItem('Day 1 - Task 2', day1.task2));

function getItem(label:string, func:Function):HTMLLIElement {
  const item = document.createElement('li');
  const link:HTMLAnchorElement = document.createElement('a');
  link.textContent = label;
  link.href = '#';
  link.onclick = () => { alert(func()); };
  item.appendChild(link);
  return item;
}
