const colorOption = document.querySelector("#color-picker input");
const pencilEraser = document.querySelector("#pencil-eraser input");
const colorModes = document.getElementsByName("color-mode");
const gridRatio = document.querySelector(".grid-ratio span");
const gridOption = document.querySelector("#grid-maker input");
const lineRemoverButton = document.querySelector("#lines-remover button");
const sketchBoard = document.getElementById("sketch-board");
var pixel = document.querySelectorAll('.pixel');
const footerYear = document.querySelector(".year");

// ---------------------------fucntions & Classes-----------------------------

class ColorMode {
  constructor() {
    this.random = false;
    this.PDE = false;
    this.none = true;
  }
};

class Grid {
  constructor(rows, cols, color) {
    this.rows = rows;
    this.cols = cols;
    this.color = color || 'black';
    this.pencil = true;
    this.colorMode = new ColorMode();
  }

  createGrid() {
    let gridSize = this.rows * this.cols;
    let arrayOfDivs = [];
    sketchBoard.style.gridTemplateColumns = `repeat(${this.cols},1fr)`;
    sketchBoard.style.gridTemplaterows = `repeat(${this.rows},1fr)`;
    for (let i = 0; i < gridSize; i++) {
      createPixel(arrayOfDivs);
    }
    replacePixels(arrayOfDivs);
    pixel = document.querySelectorAll('.pixel');
    this.draw();
  }
  draw() {
    var _this = this;
    pixel.forEach((element) => {
      element.addEventListener("mouseover", function () {
        if (_this.colorMode.random) {
          this.style.backgroundColor = `${_this.pencil ? randomColor() : sketchBoard.style.getPropertyValue("backgroundColor")}`;
        }
        else if (_this.colorMode.PDE) {
          this.id = (parseFloat(this.id) + 0.1).toFixed(1);
          let r = (hexToDecimal(_this.color.toString().slice(1, 3)));
          let g = (hexToDecimal(_this.color.toString().slice(3, 5)));
          let b = (hexToDecimal(_this.color.toString().slice(5, 7)));
          this.style.backgroundColor = `${_this.pencil ? `rgba(${r},${g},${b},${this.id})` : sketchBoard.style.getPropertyValue("backgroundColor")}`;
        }
        else
          this.style.backgroundColor = `${_this.pencil ? _this.color : sketchBoard.style.getPropertyValue("backgroundColor")}`;
      });
    });
  }
}

function createPixel(array) {
  let newDiv = document.createElement('div');
  newDiv.classList.add('pixel');
  newDiv.setAttribute("id", 0);
  array.push(newDiv);
}

function replacePixels(arrayOfElement) {
  sketchBoard.replaceChildren(...arrayOfElement);
}

function randomColor() {
  return `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;
}
/* color:#ffc0cb; */
const hexToDecimal = hex => parseInt(hex, 16);

// --------------------------execution------------------------------


footerYear.textContent = new Date().getFullYear();

var gridOptionValue = gridOption.value;
var grid = new Grid(gridOptionValue, gridOptionValue, colorOption.value);

grid.createGrid();


gridOption.addEventListener("change", function () {
  grid.rows = grid.cols = this.value;
  grid.createGrid();
  gridRatio.textContent = `${grid.rows} × ${grid.cols}`;
});


lineRemoverButton.addEventListener("click", function () {
  if (pixel[0].className.includes("border-none")) {
    this.textContent = "Hide Lines";
    for (let i = 0; i < grid.rows * grid.cols; i++) {
      pixel[i].classList.remove('border-none');
    }
  }
  else {
    this.textContent = "Show Lines";
    for (let i = 0; i < grid.rows * grid.cols; i++) {
      pixel[i].classList.add('border-none');
    }

  }
});

colorOption.addEventListener("change", function () {
  grid.color = this.value;
})

pencilEraser.addEventListener("click", function () {
  grid.pencil = (this.checked) ? true : false;
})

colorModes.forEach((element) => {
  element.addEventListener("click", function () {
    switch (this.value) {
      case "random":
        grid.colorMode.random = true;
        grid.colorMode.PDE = false;
        grid.colorMode.none = false;
        break;
      case "PDE":
        grid.colorMode.random = false;
        grid.colorMode.PDE = true;
        grid.colorMode.none = false;
        break;
      case "none":
        grid.colorMode.random = false;
        grid.colorMode.PDE = false;
        grid.colorMode.none = true;
        break;
    }

  });
});


