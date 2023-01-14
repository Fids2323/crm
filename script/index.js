'use strict';
let supplies = [
  {
    'id': 1,
    'title': 'Смартфон Xiaomi 11T 8/128GB',
    'price': 27000,
    'description': 'Смартфон Xiaomi 11T – это представитель флагманской линейки, выпущенной во второй половине 2021 года. И он полностью соответствует такому позиционированию, предоставляя своим обладателям возможность пользоваться отличными камерами, ни в чем себя не ограничивать при запуске игр и других требовательных приложений.',
    'category': 'mobile-phone',
    'discount': false,
    'count': 3,
    'units': 'шт',
    'images': {
      'small': 'img/smrtxiaomi11t-m.jpg',
      'big': 'img/smrtxiaomi11t-b.jpg',
    },
  },
  {
    'id': 2,
    'title': 'Радиоуправляемый автомобиль Cheetan',
    'price': 4000,
    'description': 'Внедорожник на дистанционном управлении. Скорость 25км/ч. Возраст 7 - 14 лет',
    'category': 'toys',
    'discount': 5,
    'count': 1,
    'units': 'шт',
    'images': {
      'small': 'img/cheetancar-m.jpg',
      'big': 'img/cheetancar-b.jpg',
    },
  },
  {
    'id': 3,
    'title': 'ТВ приставка MECOOL KI',
    'price': 12400,
    'description': 'Всего лишь один шаг сделает ваш телевизор умным, Быстрый и умный MECOOL KI PRO, прекрасно спроектированный, сочетает в себе прочный процессор Cortex-A53 с чипом Amlogic S905D',
    'category': 'tv-box',
    'discount': 15,
    'count': 4,
    'units': 'шт',
    'images': {
      'small': 'img/tvboxmecool-m.jpg',
      'big': 'img/tvboxmecool-b.jpg',
    },
  },
  {
    'id': 4,
    'title': 'Витая пара PROConnect 01-0043-3-25',
    'price': 22,
    'description': 'Витая пара Proconnect 01-0043-3-25 является сетевым кабелем с 4 парами проводов типа UTP, в качестве проводника в которых используется алюминий, плакированный медью CCA. Такая неэкранированная витая пара с одножильными проводами диаметром 0.50 мм широко применяется в процессе сетевых монтажных работ. С ее помощью вы сможете обеспечить развертывание локальной сети в домашних условиях или на предприятии, объединить все необходимое вам оборудование в единую сеть.',
    'category': 'cables',
    'discount': false,
    'count': 420,
    'units': 'v',
    'images': {
      'small': 'img/lan_proconnect43-3-25.jpg',
      'big': 'img/lan_proconnect43-3-25-b.jpg',
    },
  },
];

const overlay = document.querySelector('.overlay');
const tableBody = document.querySelector('.table__body');
const btnAdd = document.querySelector('.panel__add-goods');
const vendorCodeId = document.querySelector('.vendor-code__id');
const form = document.querySelector('.modal__form');
const cmsTotalPrice = document.querySelector('.cms__total-price');
overlay.classList.remove('active');


// Cоздаем эелемент с параметрами
const createElem = (tag, classes, text, data) => {
  const elem = document.createElement(tag);
  if (classes) elem.className = classes;
  if (text) elem.textContent = text;
  if (data) elem.dataset.id = data;
  return elem;
};
// Создаем строку таблицы
const createRow = (obj, index) => {
  const tr = createElem('tr');
  const td1 = createElem('td', 'table__cell', `${index}`);
  const tdName = createElem('td',
    'table__cell table__cell_left table__cell_name', obj.title, obj.id);
  const span = createElem('span', 'table__cell-id', `id: ${obj.id} `);
  tdName.prepend(span);
  const tdLeft = createElem('td', 'table__cell table__cell_left', obj.category);
  const tdNum = createElem('td', 'table__cell', obj.units);
  const tdCount = createElem('td', 'table__cell', obj.count);
  const tdPrice = createElem('td', 'table__cell', '₽ ' + obj.price);
  const tdTotalPrice = createElem('td', 'table__cell', '₽ ' + (obj.price * obj.count) / 100 * (100 - obj.discount));
  const tdBtnWrap = createElem('td', 'table__cell table__cell_btn-wrapper');
  const buttonPic = createElem('button', 'table__btn table__btn_pic');
  const buttonEdit = createElem('button', 'table__btn table__btn_edit');
  const buttonDel = createElem('button', 'table__btn table__btn_del');
  tdBtnWrap.append(buttonPic, buttonEdit, buttonDel);
  tr.append(td1, tdName, tdLeft, tdNum,
    tdCount, tdPrice, tdTotalPrice, tdBtnWrap);
  return tr;
};
// Рендер строки в таблицу
const renderGoods = (arr) => {
  arr.forEach((tr, index) => {
    const row = createRow(tr, ++index);
    tableBody.append(row);
  });
};

tableBody.textContent = '';

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};


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

const countPrice = (price, num, discount) => {// расчет прайса
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

const countTotalPrice = () => {
  const result = supplies.reduce((acc, supply) => acc + countPrice(supply.price, supply.count, supply.discount), 0);
  cmsTotalPrice.textContent = '$ ' + result;
};

countTotalPrice();
const modalControl = () => {
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
  };
  btnAdd.addEventListener('click', modalOpen);
  overlay.addEventListener('click', (e) => {
    const target = e.target;
    if (target === overlay || target.closest('.modal__close')) {
      modalClose();
    }
    inputControl();// Действия с checkbox
  });
  modalPrice.addEventListener('blur', () => {
    modalTotalPrice.textContent = '$ ' + countPrice(+modalPrice.value, +modalCount.value, +modalDiscount.value);
  });
  modalCount.addEventListener('blur', () => {
    modalTotalPrice.textContent = '$ ' + countPrice(+modalPrice.value, +modalCount.value, +modalDiscount.value);
  });
  modalDiscount.addEventListener('blur', () => {
    modalTotalPrice.textContent = '$ ' + countPrice(+modalPrice.value, +modalCount.value, +modalDiscount.value);
  });

  return {
    modalClose,
    vendorCodeId,
  };
};

renderGoods(supplies);

const deleteSupply = () => {
  const tbody = document.querySelector('.table__body');
  tbody.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.table__btn_del')) {
      const tr = target.closest('tr');
      const idSupply = +tr.querySelector('.table__cell_left').dataset.id;// переделал на id
      supplies = supplies.filter(supply => supply.id !== idSupply);
      tableBody.textContent = '';
      renderGoods(supplies);
      countTotalPrice();
    }
  });
};

deleteSupply();

const addSupply = () => {
  const {modalClose, vendorCodeId} = modalControl();
  const arrayModalInput = [...document.querySelectorAll('.modal__input')];
  arrayModalInput.map((input) => {
    input.required = true;
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newSupply = Object.fromEntries(formData);
    let index = supplies.length;// добавили номер строки
    newSupply.id = +vendorCodeId.textContent;// добавлили id
    if (newSupply.discount === 'on') {// отсутствие скидки
      newSupply.discount = +newSupply.discount_count;
    } else {
      newSupply.discount = false;
    }
    supplies.push(newSupply);// добавили обьект в массив
    const newRow = createRow(newSupply, ++index);// создали строку
    tableBody.append(newRow);
    modalClose();
    countTotalPrice();
  });
};
addSupply();


