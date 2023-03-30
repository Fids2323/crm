//Random number
export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

//Base64
export const toBase64 = (file) =>
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

//Count price
export const countPrice = (price, num, discount) => {
  let result = 0;
  if (price) {
    result += price;
  }
  if (num) {
    result *= num;
  }
  if (discount && discount !== 0) {
    result = (result / 100) * (100 - discount);
  }
  return +result.toFixed(2);
};
