import { API_URL } from "./const.js";
import { tbody } from "./const.js";
import { countPrice } from "./utils.js";

// Create element with parameters
const createElem = (tag, classes, text, data) => {
  const elem = document.createElement(tag);
  if (classes) elem.className = classes;
  if (text) elem.textContent = text;
  if (data) elem.dataset.id = data;
  return elem;
};

// Create tableRow
export const createRow = (obj, index) => {
  const tr = createElem("tr");
  const td1 = createElem("td", "table__cell", `${index}`);
  const tdName = createElem(
    "td",
    "table__cell table__cell_left table__cell_name",
    obj.title,
    obj.id
  );
  const span = createElem("span", "table__cell-id", `id: ${obj.id} `);
  tdName.prepend(span);
  const tdLeft = createElem("td", "table__cell table__cell_left", obj.category);
  const tdNum = createElem("td", "table__cell", obj.units);
  const tdCount = createElem("td", "table__cell", obj.count);
  const tdPrice = createElem("td", "table__cell", "₽ " + obj.price);
  const tdTotalPrice = createElem(
    "td",
    "table__cell",
    "₽ " + ((obj.price * obj.count) / 100) * (100 - obj.discount)
  );
  const tdBtnWrap = createElem("td", "table__cell table__cell_btn-wrapper");
  const buttonPic = createElem("button", "table__btn table__btn_pic");
  buttonPic.dataset.pic = `${API_URL}${obj.image}`;
  const buttonEdit = createElem("button", "table__btn table__btn_edit");
  const buttonDel = createElem("button", "table__btn table__btn_del");
  tdBtnWrap.append(buttonPic, buttonEdit, buttonDel);
  tr.append(
    td1,
    tdName,
    tdLeft,
    tdNum,
    tdCount,
    tdPrice,
    tdTotalPrice,
    tdBtnWrap
  );
  return tr;
};

//count total price
export const countTotalPrice = (arr) => {
  const cmsTotalPrice = document.querySelector(".cms__total-price");
  const result = arr.reduce(
    (acc, supply) =>
      acc + countPrice(supply.price, supply.count, supply.discount),
    0
  );
  cmsTotalPrice.textContent = "₽ " + result.toFixed(2);
};

export const initTable = () => {
  tbody.textContent = "";
  fetch(`${API_URL}api/goods`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((tr, index) => {
        const row = createRow(tr, ++index);
        tbody.append(row);
      });
      countTotalPrice(data);
    });
};
