import { getStorage, setStorage, removeStorage } from "./serviceStorage.js";
import modalControl from "./modalControl.js";

//open picture
const openImage = () => {
  const tbody = document.querySelector(".table__body");
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
};

//Base64
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener("loadend", () => {
      resolve(reader.result);
    });

    reader.addEventListener("error", (err) => {
      reject(err);
    });

    reader.readAsDataURL(file);
  });

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
    result = (result / 100) * (100 - discount);
  }
  return result;
};
//count total price
const countTotalPrice = () => {
  const cmsTotalPrice = document.querySelector(".cms__total-price");
  const result = getStorage("data").reduce(
    (acc, supply) =>
      acc + countPrice(supply.price, supply.count, supply.discount),
    0
  );
  cmsTotalPrice.textContent = "₽ " + result;
};

//Delete supply
const deleteSupply = () => {
  const tbody = document.querySelector(".table__body");
  tbody.addEventListener("click", (e) => {
    const target = e.target;
    if (target.closest(".table__btn_del")) {
      const tr = target.closest("tr");
      const idSupply = +tr.querySelector(".table__cell_left").dataset.id;
      removeStorage("data", idSupply);
    }
  });
};

//Add supply
const addSupply = () => {
  const form = document.querySelector(".modal__form");
  const img = form.querySelector("#image");
  const preview = form.querySelector(".preview");
  const { modalClose, vendorCodeId } = modalControl();

  //required inputs with modal
  const arrayModalInput = [...document.querySelectorAll(".modal__input")];
  arrayModalInput.map((input) => {
    input.required = true;
  });

  //preview image
  img.addEventListener("change", async () => {
    const fieldset = form.querySelector(".modal__fieldset");

    if (fieldset.querySelector("p")) {
      fieldset.querySelector("p").textContent = "";
    }
    if (preview.src) {
      preview.removeAttribute("src");
    }

    if (img.files.length > 0) {
      //const src = URL.createObjectURL(img.files[0]);
      const result = await toBase64(img.files[0]);

      if (img.files[0].size < 1000000) {
        preview.src = result;
      } else {
        const previewText = document.createElement("p");
        previewText.textContent = "Изображение не должно превышать размер 1 Мб";
        previewText.style.cssText =
          "color: red; font-size: 16px; text-transform: uppercase; font-weight: bold";
        fieldset.appendChild(previewText);
      }
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newSupply = Object.fromEntries(formData);
    newSupply.image = await toBase64(newSupply.image);
    newSupply.id = +vendorCodeId.textContent;
    console.log(newSupply);

    //no discount
    if (newSupply.discount === "on") {
      newSupply.discount = +newSupply.discount_count;
    } else {
      newSupply.discount = false;
    }
    setStorage("data", newSupply);
    form.reset(); //clear form
    modalClose();
  });
};

export { countPrice, countTotalPrice, deleteSupply, addSupply, openImage };
