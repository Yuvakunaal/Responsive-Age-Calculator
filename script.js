const inputs = document.querySelectorAll(".box .top input");
inputs.forEach((input) => {
  input.addEventListener("keydown", (event) => {
    if (
      event.key === "Backspace" ||
      event.key === "Tab" ||
      event.key === "Delete" ||
      event.key === "ArrowLeft" ||
      event.key === "ArrowRight"
    ) {
      return;
    }
    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  });
});

let dayInput = document.querySelector(".box .top .day .dayy");
let monthInput = document.querySelector(".box .top .month .monthh");
let yearInput = document.querySelector(".box .top .year .yearr");
let btn = document.querySelector(".box .middle .btn");
let dayOutput = document.querySelector(".box .bottom .days .day");
let monthOutput = document.querySelector(".box .bottom .months .month");
let yearOutput = document.querySelector(".box .bottom .years .year");

let inputDay = document.querySelector(".box .top .day");
let inputMonth = document.querySelector(".box .top .month");
let inputYear = document.querySelector(".box .top .year");

let labels = document.querySelectorAll(".box .top div p");

btn.addEventListener("click", () => {
  let day = parseInt(dayInput.value);
  let month = parseInt(monthInput.value);
  let year = parseInt(yearInput.value);

  let currYear = new Date().getFullYear();

  const month_days_31 = [1, 3, 5, 7, 8, 10, 12];
  const month_days_30 = [4, 6, 9, 11];

  let missing = [];
  if (isNaN(day)) missing.push(1);
  if (isNaN(month)) missing.push(2);
  if (isNaN(year)) missing.push(3);

  if (missing.length > 0) {
    display_error(4, missing);
    return;
  }

  if (year > currYear || year === 0) {
    display_error(0);
    return;
  }

  if (month < 1 || month > 12) {
    display_error(1);
    return;
  }

  if (
    (month_days_31.includes(month) && day > 31) ||
    (month_days_30.includes(month) && day > 30)
  ) {
    display_error(2);
    return;
  }

  if (month === 2) {
    if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
      if (day > 29) {
        display_error(2);
        return;
      }
    } else {
      if (day > 28) {
        display_error(2);
        return;
      }
    }
  }

  // Now subtract 1 for JS month (0-based)
  display_output(year, month - 1, day);

  function display_error(type, errorFields = []) {
    // Always reset all field errors first
    inputDay.classList.remove("error1", "error2", "error3", "error4");
    inputMonth.classList.remove("error1", "error2", "error3", "error4");
    inputYear.classList.remove("error1", "error2", "error3", "error4");

    // Specific type errors
    if (type === 0) inputYear.classList.add("error3"); // Must be in the past
    else if (type === 1) inputMonth.classList.add("error2"); // Invalid month
    else if (type === 2) inputDay.classList.add("error1"); // Invalid day
    else if (type === 4) {
      if (errorFields.includes(1)) inputDay.classList.add("error4");
      if (errorFields.includes(2)) inputMonth.classList.add("error4");
      if (errorFields.includes(3)) inputYear.classList.add("error4");
    }

    inputs.forEach((input) => input.classList.add("error"));
    labels.forEach((label) => label.classList.add("error"));

    yearOutput.innerText = "- -";
    monthOutput.innerText = "- -";
    dayOutput.innerText = "- -";
  }

  function display_output(year, month, day) {
    inputDay.classList.remove("error1", "error2", "error3", "error4");
    inputMonth.classList.remove("error1", "error2", "error3", "error4");
    inputYear.classList.remove("error1", "error2", "error3", "error4");

    inputs.forEach((input) => input.classList.remove("error"));
    labels.forEach((label) => label.classList.remove("error"));

    labels.forEach((label) => {
      label.classList.remove("error");
    });
    const today = new Date();
    const givenDate = new Date(year, month, day);

    let years = today.getFullYear() - givenDate.getFullYear();
    let months = today.getMonth() - givenDate.getMonth();
    let days = today.getDate() - givenDate.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      ).getDate();
      days += lastMonth;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    yearOutput.innerText = years;
    monthOutput.innerText = months;
    dayOutput.innerText = days;
  }
});
