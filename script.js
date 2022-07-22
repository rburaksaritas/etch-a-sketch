/* slider value display script */
var gridSlider = document.getElementById("grid-slider");
var gridDisplay = document.getElementById("grid-display");
var gridValue = 16; // default initial value 
let gridElements = makeGrid(gridValue); // initializes first artboard grid
let rainbowMode = false;
let shadingMode = false;

gridSlider.oninput = function() {
    gridDisplay.textContent = `Board Grid: ${gridSlider.value}x${gridSlider.value}`
    gridValue = gridSlider.value;
    gridElements = makeGrid(gridValue);
    addListenerForSketch();
}

/* creates new grid for artboard */
/* returns new collection of grid items */
function makeGrid(gridValue){
    const sizeOfElements = (480/gridValue); // assuming artboard width and height fixed 480px
    const numberOfElements = Math.pow(gridValue, 2);
    clearGrid();
    setArtboardProperties(numberOfElements, sizeOfElements);
    addGridElement(numberOfElements);
    return document.querySelectorAll(".grid-item");
}

function clearGrid() {
    const artboard = document.getElementById("artboard");   
    var gridElement = artboard.lastElementChild; 
    while (gridElement) {
        artboard.removeChild(gridElement);
        gridElement = artboard.lastElementChild;
    }
}

function addGridElement(numberOfElements){
    const artboard = document.getElementById("artboard");
    for(let i = 0; i<numberOfElements; i++){
        const gridElement = document.createElement("div");
        gridElement.classList.add("grid-item");
        artboard.appendChild(gridElement);
    }
}

function setArtboardProperties(numberOfElements, sizeOfElements){
    const artboard = document.getElementById("artboard");
    artboard.style.gridTemplateColumns = `repeat(${gridValue}, ${sizeOfElements}px)`;
    artboard.style.gridAutoRows = `${sizeOfElements}px`;
}

/* sketches with chosen color when hovered over artboard */
function addListenerForSketch(){
    gridElements.forEach(element => {
        element.addEventListener("mouseover", doSketch);
    });
}
addListenerForSketch();

function getCurrentColor(){
    const colorPicker = document.getElementById("color-picker");
    const colorValue = colorPicker.value;
    return colorValue;
}

function doSketch(e){
    let colorValue;
    if(rainbowMode){
        colorValue = getRandomColor();
    } else{
        colorValue = getCurrentColor();
    }
    this.style.backgroundColor = colorValue;
}

/* clears the artboard when clear button is clicked */
const clearButton = document.querySelector(".clear-button");
clearButton.addEventListener("click", clear);

function clear(e){
   gridElements.forEach(element => {element.style.backgroundColor = "#ffffff"});
}

/* sets current color to white when eraser button is clicked */
const eraserButton = document.querySelector(".eraser-button");
eraserButton.addEventListener("click", setEraser);

function setEraser(e){
    const colorPicker = document.getElementById("color-picker");
    colorPicker.value = "#ffffff";
}

/* rainbow mode: changes current color randomly when rainbow mode button is clicked */
const rainbowButton = document.querySelector(".rainbow-button");
rainbowButton.addEventListener("click", () => {
    rainbowMode = true;
    shadingMode = false; 
});

function getRandomColor(){
    const letters = "0123456789ABCDEF".split("");
    let color = "#";
    for (let i = 0; i < 6; i++){
        color += letters[Math.round(Math.random()*15)];
    }
    return color;
}

/* default mode: sets rainbow and shading modes to false */
const defaultButton = document.querySelector(".default-button");
defaultButton.addEventListener("click", () => {
    rainbowMode = false;
    shadingMode = false;
});

