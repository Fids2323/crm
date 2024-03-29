// Create element with parameters
const createElem = (tag, classes, text, data) => {
  const elem = document.createElement(tag);
  if (classes) elem.className = classes;
  if (text) elem.textContent = text;
  if (data) elem.dataset.id = data;
  return elem;
};

// Create tableRow
const createRow = (obj, index) => {
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
  buttonPic.dataset.pic =
    "https://look.com.ua/pic/201704/800x600/look.com.ua-204614.jpg";
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

const createPreview = () => {
  const fieldset = document.querySelector(".modal__fieldset");
  const wrapper = document.createElement("div");
  const img = document.createElement("img");

  img.className = "preview";
  wrapper.className = "wrapper";
  wrapper.append(img);
  fieldset.after(wrapper);
  img.style.cssText = "margin: 0 auto 20px; display: block;";
};

export { createElem, createRow, createPreview };
