import { day0101link, day0102link } from './day1' ;

const list = document.createElement('ul');
document.body.appendChild(list);

const item0101 = document.createElement('li');
list.appendChild(item0101);
item0101.appendChild(day0101link);

const item0102 = document.createElement('li');
list.appendChild(item0102);
item0102.appendChild(day0102link);
