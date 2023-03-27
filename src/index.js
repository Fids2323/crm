import "./css/index.css";
import { initTable } from "./script/initTable";
import "./script/controls";
import { initCategory } from "./script/formControl";
// import {
//   countTotalPrice,
//   deleteSupply,
//   addSupply,
//   openImage,
// } from "./script/control.js";
// import { getStorage } from "./script/serviceStorage.js";
// import modalControl from "./script/modalControl.js";
//import renderGoods from "./script/render.js";
// import { createPreview } from "./script/createElements.js";

const init = () => {
  //renderGoods(getStorage("data"));
  // createPreview();
  // modalControl();
  // countTotalPrice();
  // addSupply();
  // deleteSupply();
  // openImage();

  initTable();
  initCategory();
};

window.addEventListener("DOMContentLoaded", init);
