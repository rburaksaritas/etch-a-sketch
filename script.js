
/* slider value display script */
var gridSlider = document.getElementById("grid-slider");
var gridValue = document.getElementById("grid-display");

gridSlider.oninput = function() {
    gridValue.textContent = `Board Grid: ${gridSlider.value}x${gridSlider.value}`
}
