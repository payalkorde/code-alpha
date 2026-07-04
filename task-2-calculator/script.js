const display = document.getElementById("display");

/* ---------- BASIC FUNCTIONS ---------- */

function append(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function calculate() {
  try {
    if (display.value === "") return;
    display.value = Function('"use strict"; return (' + display.value + ')')();
  } catch {
    display.value = "Error";
  }
}

/* ---------- ADVANCED FUNCTIONS ---------- */

function sqrt() {
  let num = parseFloat(display.value);
  if (isNaN(num) || num < 0) {
    display.value = "Error";
    return;
  }
  display.value = Math.sqrt(num);
}

function percent() {
  let num = parseFloat(display.value);
  if (isNaN(num)) {
    display.value = "Error";
    return;
  }
  display.value = num / 100;
}

function inverse() {
  let num = parseFloat(display.value);
  if (isNaN(num) || num === 0) {
    display.value = "Error";
    return;
  }
  display.value = 1 / num;
}

function toggleSign() {
  if (display.value === "") return;

  if (display.value.startsWith("-")) {
    display.value = display.value.slice(1);
  } else {
    display.value = "-" + display.value;
  }
}

/* ---------- THEME TOGGLE ---------- */

function toggleTheme() {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
}

/* ---------- LOAD SAVED THEME ---------- */

window.onload = function () {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    document.body.classList.add("light");
  }
};
