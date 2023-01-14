import {
	createRow
} from './createElements.js'
import {countTotalPrice} from './control.js'


//Render goods from an array
const renderGoods = (arr) => {
	const tableBody = document.querySelector('.table__body');
	tableBody.textContent = '';
  arr.forEach((tr, index) => {
    const row = createRow(tr, ++index);
    tableBody.append(row);
  });
	countTotalPrice();
};

export default renderGoods