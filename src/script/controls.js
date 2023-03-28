import axios from "axios";
import { form, tbody } from "./const";
import { API_URL } from "./const.js";
import { countPrice, countTotalPrice, createRow, initTable } from "./initTable";
import { getRandomInt } from "./utils";

//Open image
tbody.addEventListener("click", (e) => {
  const target = e.target;
  if (target.closest(".table__btn_pic")) {
    const url = target.dataset.pic;
    const windowHeight = screen.height;
    const windowWidth = screen.width;
    const right = (windowWidth - 800) / 2;
    const bot = (windowHeight - 600) / 2;
    const image = open(
      url,
      "pica",
      `width=800,height= 600,top=${bot},left=${right}`
    );
  }
});

//Search input
const searchInput = document.querySelector(".panel__input");
let searchTimer = null;

const updateTableData = (data) => {
  tbody.innerHTML = "";
  data.forEach((tr, index) => {
    const row = createRow(tr, ++index);
    tbody.append(row);
  });
  countTotalPrice(data);
};

searchInput.addEventListener("input", () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    const query = searchInput.value;
    fetch(`${API_URL}api/goods?search=${query}`)
      .then((response) => response.json())
      .then((data) => {
        updateTableData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, 300);
});

//Delete goods
tbody.addEventListener("click", (e) => {
  const target = e.target;
  if (target.closest(".table__btn_del")) {
    const tr = target.closest("tr");
    const idGoods = +tr.querySelector(".table__cell_left").dataset.id;

    const remove = confirm("Удалить товар?");
    if (remove) {
      axios
        .delete(`${API_URL}api/goods/${idGoods}`)
        .then(() => {
          initTable();
        })
        .catch((err) => console.log(err));
    }
  }
});

//Modal control
const btnAdd = document.querySelector(".panel__add-goods");
const overlay = document.querySelector(".overlay");
const vendorCodeId = document.querySelector(".vendor-code__id");
const modalPrice = document.querySelector("#price");
const modalCount = document.querySelector("#count");
const modalDiscount = document.querySelector(".modal__input_discount");
const modalTotalPrice = document.querySelector(".modal__total-price");
const modalCheckbox = document.querySelector(".modal__checkbox");
const modalInputDiscount = document.querySelector(".modal__input_discount");

export const modalOpen = () => {
  overlay.classList.add("active");
  vendorCodeId.textContent = getRandomInt(1000000000, 9999999999);
  form.reset();
  form.dataset.action = "add";
};

export const modalClose = () => {
  const img = document.querySelector(".preview");
  const previewText = document.querySelector(".preview-text");

  overlay.classList.remove("active");
  modalTotalPrice.textContent = "₽ 0";
  img.removeAttribute("src");
  previewText.textContent = "";
};

//Open and close the modal
btnAdd.addEventListener("click", modalOpen);
overlay.addEventListener("click", (e) => {
  const target = e.target;
  if (target === overlay || target.closest(".modal__close")) {
    modalClose();
  }
});

//Change modal total price
modalPrice.addEventListener("blur", () => {
  modalTotalPrice.textContent =
    "₽ " +
    countPrice(+modalPrice.value, +modalCount.value, +modalDiscount.value);
});
modalCount.addEventListener("blur", () => {
  modalTotalPrice.textContent =
    "₽ " +
    countPrice(+modalPrice.value, +modalCount.value, +modalDiscount.value);
});
modalDiscount.addEventListener("blur", () => {
  modalTotalPrice.textContent =
    "₽ " +
    countPrice(+modalPrice.value, +modalCount.value, +modalDiscount.value);
});

//Checkbox modal disable
modalCheckbox.addEventListener("change", () => {
  if (modalCheckbox.checked) {
    modalInputDiscount.disabled = false;
  } else {
    modalInputDiscount.value = "";
    modalInputDiscount.disabled = true;
  }
});
