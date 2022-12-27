'use strict';
let supplies = [
  {
    'id': 1,
    'title': 'Смартфон Xiaomi 11T 8/128GB',
    'price': 27000,
    'description': 'Смартфон Xiaomi 11T – это представитель флагманской линейки, выпущенной во второй половине 2021 года. И он полностью соответствует такому позиционированию, предоставляя своим обладателям возможность пользоваться отличными камерами, ни в чем себя не ограничивать при запуске игр и других требовательных приложений.',
    'category': 'mobile-phone',
    'discont': false,
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
    'discont': 5,
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
    'discont': 15,
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
    'discont': false,
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
const createRow = (obj,index) => {
  const tr = createElem('tr');
  const td1 = createElem('td', 'table__cell', `${index}`);
  const tdName = createElem('td',
    'table__cell table__cell_left table__cell_name', obj.title, 24601654816512);
  const span = createElem('span', 'table__cell-id', 'id: 24601654816512');
  tdName.prepend(span);
  const tdLeft = createElem('td', 'table__cell table__cell_left', obj.category);
  const tdNum = createElem('td', 'table__cell', obj.units);
  const tdCount = createElem('td', 'table__cell', obj.count);
  const tdPrice = createElem('td', 'table__cell', '₽ ' + obj.price);
  const tdTotalPrice = createElem('td', 'table__cell', '₽ ' + obj.price * obj.count);
  const tdBtnWrap = createElem('td', 'table__cell table__cell_btn-wrapper');
  const buttonPic = createElem('button', 'table__btn table__btn_pic');
  const buttonEdit = createElem('button', 'table__btn table__btn_edit');
  const buttonDel = createElem('button', 'table__btn table__btn_del');
  tdBtnWrap.append(buttonPic, buttonEdit, buttonDel);
  tr.append(td1, tdName, tdLeft, tdNum,
    tdCount, tdPrice, tdTotalPrice, tdBtnWrap);
  return tr;
};
// Добавляем строки в таблицу
const renderGoods = (arr) => {
  arr.forEach((tr,index) => {
    const row = createRow(tr,++index);
    tableBody.append(row);
  });
};

tableBody.textContent = '';


btnAdd.addEventListener('click', () => {
  overlay.classList.add('active');
});

overlay.addEventListener('click', (e) => {
  const target = e.target;
  if (target === overlay || target.closest('.modal__close')) {
    overlay.classList.remove('active');
  }
});

renderGoods(supplies);

const tbody = document.querySelector('.table__body');
tbody.addEventListener('click', (e) => {
  const target = e.target;
  if (target.closest('.table__btn_del')) {
    const tr = target.closest('tr');
		//Через slice достучался до текста, т.к если привязать id, то при обновлении массива индекс строк будет не правильный.
    const textRow = tr.querySelector('.table__cell_name').textContent.slice(18);
    supplies = supplies.filter(supply => supply.title !== textRow);
    console.log(supplies);
    tableBody.textContent = '';
    renderGoods(supplies);
  }
});
