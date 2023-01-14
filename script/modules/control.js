import {
  getStorage,
  setStorage,
  removeStorage,
} from './serviceStorage.js'
import modalControl from './modalControl.js'
//count price
const countPrice = (price, num, discount) => {
  let result = 0;
  if (price) {
    result += price;
  }
  if (num) {
    result *= num;
  }
  if (discount) {
    result = result / 100 * (100 - discount);
  }
  return result;
};
//count total price
const countTotalPrice = () => {
	const cmsTotalPrice = document.querySelector('.cms__total-price');
  const result = getStorage ('data').reduce((acc, supply) => acc + countPrice(supply.price, supply.count, supply.discount), 0);
  cmsTotalPrice.textContent = '₽ ' + result;
};

//Delete supply
const deleteSupply = () => {
  const tbody = document.querySelector('.table__body');
  tbody.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.table__btn_del')) {
      const tr = target.closest('tr');
      const idSupply = +tr.querySelector('.table__cell_left').dataset.id;
      removeStorage('data', idSupply)
    }
  });
};

//Add supply
const addSupply = () => {
	const form = document.querySelector('.modal__form');
  const {modalClose, vendorCodeId} = modalControl();
	//required inputs with modal
  const arrayModalInput = [...document.querySelectorAll('.modal__input')];
  arrayModalInput.map((input) => {
    input.required = true;
  });
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newSupply = Object.fromEntries(formData);
    newSupply.id = +vendorCodeId.textContent;
		//no discount
    if (newSupply.discount === 'on') {
      newSupply.discount = +newSupply.discount_count;
    } else {
      newSupply.discount = false;
    }
    setStorage('data',newSupply);
		form.reset() //clear form
    modalClose();
  });
};

export {
	countPrice,
	countTotalPrice,
	deleteSupply,
	addSupply,
}