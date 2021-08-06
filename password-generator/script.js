const pw = document.getElementById("pw");
const copyBtn = document.getElementById("copy");
const upperCk = document.getElementById("upper");
const lowerCk = document.getElementById("lower");
const numberCk = document.getElementById("number");
const symbolCk = document.getElementById("symbol");
const lengthInput = document.getElementById("length");
const generateBtn = document.getElementById("generate");

const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+=";
let validLength = true;

const getUppercase = () => {
  return upperLetters[Math.floor(Math.random() * upperLetters.length)];
};

const getLowercase = () => {
  return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
};

const getNumber = () => {
  return numbers[Math.floor(Math.random() * numbers.length)];
};

const getSymbols = () => {
  return symbols[Math.floor(Math.random() * symbols.length)];
};

const generateX = () => {
  const arr = [];
  if (upperCk.checked) {
    arr.push(getUppercase());
  }

  if (lowerCk.checked) {
    arr.push(getLowercase());
  }

  if (numberCk.checked) {
    arr.push(getNumber());
  }

  if (symbolCk.checked) {
    arr.push(getSymbols());
  }

  return arr.length > 0 ? arr[Math.floor(Math.random() * arr.length)] : "";
};

const checkValidLength = (len) => {
  return validLength && len >= 6 && len <= 20;
};

const generatePassword = () => {
  const len = Number(lengthInput.value);

  if (!checkValidLength(len)) {
    alert("Enter length password from 6 to 20");
    return;
  }

  let password = "";

  if (upperCk.checked) {
    password += getUppercase();
  }

  if (lowerCk.checked) {
    password += getLowercase();
  }

  if (numberCk.checked) {
    password += getNumber();
  }

  if (symbolCk.checked) {
    password += getSymbols();
  }

  for (let i = password.length; i < len; i++) {
    const x = generateX();
    password += x;
  }

  pw.innerText = password;
};

generateBtn.addEventListener("click", generatePassword);

copyBtn.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = pw.innerHTML;
  if (!password) return;

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard");
});
