/* slider value display script */
var gridSlider = document.getElementById("grid-slider");
var gridDisplay = document.getElementById("grid-display");
var gridValue = 16; // default initial value 
let gridElements = makeGrid(gridValue); // initializes first artboard grid

gridSlider.oninput = function() {
    gridDisplay.textContent = `Board Grid: ${gridSlider.value}x${gridSlider.value}`
    gridValue = gridSlider.value;
    gridElements = makeGrid(gridValue);
}

/* creates new grid for artboard */
function makeGrid(gridValue){
    const sizeOfElements = (480/gridValue); // assuming artboard width and height fixed 480px
    const artboard = document.getElementById("artboard");
    const numberOfElements = Math.pow(gridValue, 2);
    clearArtboard();
    setArtboardProperties(numberOfElements, sizeOfElements);
    addGridElement(numberOfElements);
    return document.querySelectorAll(".grid-item");
}

function clearArtboard() {
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
gridElements.forEach(element => {
    element.addEventListener("mouseover", doSketch);
});

function getCurrentColor(){
    const colorPicker = document.getElementById("color-picker");
    const colorValue = colorPicker.value;
    return colorValue;
}

function doSketch(e){
    const colorValue = getCurrentColor();
    console.log(this);
    this.style.backgroundColor = colorValue;
}