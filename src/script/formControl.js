import { API_URL, modalTotalPrice, tbody, vendorCodeId } from "./const";
import { modalClose, modalOpen } from "./controls";
import { countPrice, toBase64 } from "./utils";
import { form } from "./const";
import axios from "axios";
import { initTable } from "./initTable";

//Add select by category & data-action by form
const selectCategory = document.querySelector("#category");
selectCategory.setAttribute("list", "category-list");
const dataList = document.createElement("datalist");
dataList.id = "category-list";
form.setAttribute(`data-action`, "add");

export const initCategory = () => {
  selectCategory.parentNode.after(dataList);
  fetch(`${API_URL}api/category`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        const option = document.createElement("option");
        option.setAttribute("value", item);
        dataList.append(option);
      });
    });
};

//Required inputs with modal
const arrayModalInput = [...document.querySelectorAll(".modal__input")];
arrayModalInput.map((input) => {
  input.required = true;
});

//Create preview image
const fieldset = document.querySelector(".modal__fieldset");
const wrapper = document.createElement("div");
const img = document.createElement("img");

img.className = "preview";
wrapper.className = "wrapper";
wrapper.append(img);
fieldset.after(wrapper);
img.style.cssText = "margin: 0 auto 20px; display: block;";

// Open preview image
const imageBtn = fieldset.querySelector("#image");
const previewText = document.createElement("p");
previewText.classList.add("preview-text");
fieldset.append(previewText);

imageBtn.addEventListener("change", async () => {
  if (fieldset.querySelector("p")) {
    fieldset.querySelector("p").textContent = "";
  }
  if (img.src) {
    img.removeAttribute("src");
  }

  if (imageBtn.files.length > 0) {
    const result = await toBase64(imageBtn.files[0]);

    if (imageBtn.files[0].size < 1000000) {
      img.src = result;
    } else {
      previewText.textContent = "Изображение не должно превышать размер 1 Мб";
      previewText.style.cssText =
        "color: red; font-size: 16px; text-transform: uppercase; font-weight: bold";
    }
  }
});

//Add goods

form.addEventListener("submit", async (e) => {
  const action = form.getAttribute("data-action");
  e.preventDefault();
  const formData = new FormData(e.target);
  const newGoods = Object.fromEntries(formData);
  newGoods.image = await toBase64(newGoods.image);
  newGoods.id = vendorCodeId.textContent;

  //Discount change
  if (newGoods.discount === "on") {
    newGoods.discount = +newGoods.discount_count;
  } else {
    newGoods.discount = false;
  }
  newGoods.count = +newGoods.count;
  newGoods.price = +newGoods.price;

  //Send goods & clear form
  if (action === "add") {
    axios
      .post(`${API_URL}api/goods`, newGoods)
      .then((response) => {
        console.log(response.data);
        form.reset();
        modalClose();
        initTable();
      })
      .catch((error) => {
        previewText.style.cssText =
          "color: red; font-size: 16px; font-weight: bold";
        if (error.response.status >= 400) {
          previewText.textContent = `Сообщение об ошибке: ${error.response.data.message}`;
        } else {
          previewText = "Что-то пошло не так...";
        }
      });
  } else {
    axios
      .patch(`${API_URL}api/goods/${newGoods.id}`, newGoods)
      .then(() => {
        form.reset();
        modalClose();
        initTable();
      })
      .catch((error) => {
        previewText.style.cssText =
          "color: red; font-size: 16px; font-weight: bold";
        if (error.response.status >= 400) {
          previewText.textContent = `Сообщение об ошибке: ${error.response.data.message}`;
        } else {
          previewText = "Что-то пошло не так...";
        }
      });
  }
});

//Edit goods
tbody.addEventListener("click", (e) => {
  const titleInput = form.querySelector('input[name="title"]');
  const categoryInput = form.querySelector('input[name="category"]');
  const descriptionTextarea = form.querySelector(
    'textarea[name="description"]'
  );
  const unitsInput = form.querySelector('input[name="units"]');
  const discountInput = form.querySelector('input[type="number"]');
  const countInput = form.querySelector('input[name="count"]');
  const priceInput = form.querySelector('input[name="price"]');

  const target = e.target;
  if (target.closest(".table__btn_edit")) {
    const tr = target.closest("tr");
    const idGoods = +tr.querySelector(".table__cell_left").dataset.id;
    axios(`${API_URL}api/goods/${idGoods}`).then((response) => {
      const goods = response.data;
      modalOpen();
      form.dataset.action = "edit";
      vendorCodeId.textContent = `${idGoods}`;
      titleInput.value = goods.title;
      categoryInput.value = goods.category;
      descriptionTextarea.value = goods.description;
      unitsInput.value = goods.units;
      countInput.value = goods.count;
      priceInput.value = goods.price;
      if (goods.image !== "image/notimage.jpg") {
        img.src = `${API_URL}${goods.image}`;
      }
      if (goods.discount) {
        const modalCheckbox = document.querySelector(".modal__checkbox");
        const modalInputDiscount = document.querySelector(
          ".modal__input_discount"
        );
        discountInput.value = goods.discount;
        modalInputDiscount.disabled = false;
        modalCheckbox.checked = true;
      }
      const resultModalPrice = countPrice(
        goods.price,
        goods.count,
        goods.discount
      );
      modalTotalPrice.textContent = `₽ ${resultModalPrice}`;
    });
  }
});
