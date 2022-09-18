const createArea = document.querySelectorAll(".create-area");
const addBtns = document.querySelectorAll(".add");
let xBtns = document.querySelectorAll(".x");
const submitBtns = document.querySelectorAll(".submit");
const resetBtns = document.querySelectorAll(".reset");

createArea.forEach(function (element) {
  element.addEventListener("click", function (e) {
    if (!e.target.classList.contains("btn")) {
      return;
    }

    e.preventDefault();

    if (e.target.classList.contains("x")) {
      deleteInputRow(e);
    }

    if (e.target.classList.contains("add")) {
      addInputRow(e);
    }

    if (e.target.classList.contains("reset")) {
      //   resetDashboard();
      console.log("reset");
    }

    if (e.target.classList.contains("submit")) {
      submitForm(e);
    }
  });
});

function deleteInputRow(e) {
  if (e.target.dataset.type === "array") {
    e.target.closest(".input-row").remove();
  }

  if (e.target.dataset.type === "table") {
    e.target.closest("tr").remove();
  }
}

function addInputRow(e) {
  const target = e.target.dataset.add;
  let html;
  // console.log(e.target);
  if (e.target.dataset.type === "array") {
    html = `<div class="input-row flexr rel">
      <input
        class="rel input"
        data-field="${target}"
        data-type="array"
        type="text"
        size="30"
      />
      <div class="icon-btn rel x" data-type="array">
        <i class="fa-solid fa-xmark x abs-center" data-type="array"></i>
      </div>
    </div>`;

    e.target.closest(".input-div").insertAdjacentHTML("beforeend", html);
  }

  if (e.target.dataset.type === "table") {
    const entries = e.target.dataset.entries.split(" ");
    const row =
      1 +
      Math.max(
        ...Array.from(
          e.target.closest(".input-div").querySelectorAll(".input")
        ).map((item) => Number(item.dataset.row))
      );
    console.log(row);
    html = `
      <tr id="${e.target.dataset.add}-${row}">`;

    entries.forEach((entry) => {
      html += `<td>
      <input
        data-type="table"
        data-field="${e.target.dataset.add}"
        data-row="${row}"
        data-column="${entry}"
        class="rel input"
        type="${
          entry === "date"
            ? "date"
            : entry === "time"
            ? "time"
            : entry === "quantity" ||
              entry === "days" ||
              entry === "percent" ||
              entry === "costEach"
            ? "number"
            : "text"
        }"
      />
    </td>
    `;
    });
    html += `
                      <td>
                        <div class="icon-btn rel x" data-type="table">
                          <i class="fa-solid fa-xmark x abs-center" data-type="table"></i>
                        </div>
                      </td>
                    </tr>
      `;
    // console.log(html);
    e.target
      .closest(".input-div")
      .querySelector(".table")
      .insertAdjacentHTML("beforeend", html);
    // }
  }
}

function resetDashboard(e) {}

function submitForm(e) {
  const inputs = e.target.closest(".area").querySelectorAll(".input");
  console.log(inputs);

  const values = [];
  inputs.forEach((item) => {
    if (!item.value || item.value === "select") {
      return;
    }

    // console.log(item.dataset.type);
    // console.log(item.dataset.field);
    // console.log(item.dataset.row);
    // console.log(item.dataset.column);
    // console.log(item.value);

    if (item.dataset.type === "single") {
      console.log("single");
      values[item.dataset.field] = item.value;
    }

    if (item.dataset.type === "array") {
      console.log("array");
      if (!values[item.dataset.field]) {
        values[item.dataset.field] = [];
      }
      values[item.dataset.field].push(item.value);
    }

    if (item.dataset.type === "radio") {
      console.log("radio");
      if (!item.checked) return;
      values[item.dataset.field] = item.value;
    }

    if (item.dataset.type === "checkbox") {
      console.log("checkbox");
      if (!item.checked) return;
      if (!values[item.dataset.field]) {
        values[item.dataset.field] = [];
      }
      values[item.dataset.field].push(item.value);
    }

    if (item.dataset.type === "table") {
      console.log("table");
      if (!values[item.dataset.field]) {
        values[item.dataset.field] = [];
      }
      if (!values[item.dataset.field][item.dataset.row]) {
        values[item.dataset.field][item.dataset.row] = {};
      }
      values[item.dataset.field][item.dataset.row][item.dataset.column] =
        item.value;
    }

    if (item.dataset.type === "file") {
      console.log("file");
      values[item.dataset.field] = item.value;
    }
  });
  console.log(values);
}
