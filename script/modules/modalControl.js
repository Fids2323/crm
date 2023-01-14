import {
	countPrice,
} from './control.js'
import getRandomInt from './utils.js'

//input with checkbox
const inputControl = () => {
  const modalCheckbox = document.querySelector('.modal__checkbox');
  const modalInputDiscount = document.querySelector('.modal__input_discount');
  modalCheckbox.addEventListener('change', () => {
    if (modalCheckbox.checked) {
      modalInputDiscount.disabled = false;
    } else {
      modalInputDiscount.value = '';
      modalInputDiscount.disabled = true;
    }
  });
};

const modalControl = () => {
	const btnAdd = document.querySelector('.panel__add-goods');
	const overlay = document.querySelector('.overlay');
	const vendorCodeId = document.querySelector('.vendor-code__id');
  const modalPrice = document.querySelector('#price');
  const modalCount = document.querySelector('#count');
  const modalDiscount = document.querySelector('.modal__input_discount');
  const modalTotalPrice = document.querySelector('.modal__total-price');
  const modalOpen = () => {
    overlay.classList.add('active');
    vendorCodeId.textContent = getRandomInt(0, 100000000);
  };

  const modalClose = () => {
    overlay.classList.remove('active');
		modalTotalPrice.textContent = '₽ 0'
  };
  btnAdd.addEventListener('click', modalOpen);
  overlay.addEventListener('click', (e) => {
    const target = e.target;
    if (target === overlay || target.closest('.modal__close')) {
      modalClose();
    }
    inputControl();
  });
  modalPrice.addEventListener('blur', () => {
    modalTotalPrice.textContent = '₽ ' + countPrice(+modalPrice.value, +modalCount.value, +modalDiscount.value);
  });
  modalCount.addEventListener('blur', () => {
    modalTotalPrice.textContent = '₽ ' + countPrice(+modalPrice.value, +modalCount.value, +modalDiscount.value);
  });
  modalDiscount.addEventListener('blur', () => {
    modalTotalPrice.textContent = '₽ ' + countPrice(+modalPrice.value, +modalCount.value, +modalDiscount.value);
  });

  return {
    modalClose,
    vendorCodeId,
  };
};

export default modalControl