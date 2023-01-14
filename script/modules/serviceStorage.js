import renderGoods from './render.js';
//Local storage
const getStorage = key => JSON.parse(localStorage.getItem(key)) || [];

const setStorage = (key, obj) => {
  const data = getStorage(key);
  data.push(obj);
  localStorage.setItem(key, JSON.stringify(data));
	renderGoods(getStorage('data'))
};

const removeStorage = (key, id) => {
  let data = getStorage(key);
  data = data.filter(item => item.id !== id);
  localStorage.setItem(key, JSON.stringify(data));
	renderGoods(getStorage('data'))
};

export {
  getStorage,
  setStorage,
  removeStorage,
};
