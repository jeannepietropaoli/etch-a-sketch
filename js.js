let rows = 25;
let columns;
let column;
let container = document.querySelector('.container');
const CLEARBUTTON = document.querySelector('.clearButton');
const RAINBOWBUTTON = document.querySelector('.rainbowMode');
const GRADIENTBUTTON = document.querySelector('.gradient');
const ERASERBUTTON = document.querySelector('.eraser');
const SLIDER = document.querySelector('#slider');
const COLORPICKER = document.querySelector('#colorPicker');
const BACKGROUNDPICKER =document.querySelector('#backgroundPicker');
const BORDERS = document.querySelector('.borders');
let backgroundChanged = false;
let rainbowActivated = false;
let gradientActivated = false;
let eraser = false;
let boxes;
let DEFAULTCOLOR= 'rgb(255,255,255)';
const DEFAULTHOVERCOLOR='rgb(229,36,63)';
let color= DEFAULTHOVERCOLOR;
let r;
let g;
let b;
let isClicked=false;

function createGrid(rows,columns) {    
    columns = rows;
    for (let i=0; i<columns; i++) {                  // creates a div for each column
        column = document.createElement('div');
        column.classList.add('column');
        container.appendChild(column);

        for (let j=0; j<rows; j++) {               // with x boxes (corresponding to the number of rows)
                box = document.createElement('div');
                column.appendChild(box);
                box.classList.add('box');
                box.classList.add('borderToggle');
                if  (BACKGROUNDPICKER.value !== RGBToHex(DEFAULTCOLOR)){
                    box.style.backgroundColor= BACKGROUNDPICKER.value;
                    DEFAULTCOLOR = BACKGROUNDPICKER.value;
                }else{
                    box.style.backgroundColor= DEFAULTCOLOR;
                }
        }
    }
    boxes = document.querySelectorAll('.box');

    LightItUp(color);
}

function deleteCurrentGrid(){
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
}

function generateRandomRGBValue() {
    randomRGBValue = Math.floor(Math.random()*256);
    return randomRGBValue;
}

function rainbowMode(){
    r=generateRandomRGBValue();
    g=generateRandomRGBValue();
    b=generateRandomRGBValue();
    color = `rgb(${r},${g}, ${b})`;
    return color;
}

function getRGBValues(str) {
    let vals = str.substring(str.indexOf('(') +1, str.length -1).split(', ');
      r= +vals[0],
      g= +vals[1],
      b= +vals[2]
}

function gradientMode(colorToAlter){
    getRGBValues(colorToAlter);
    changeRGB(r,g,b);
    return color;
}

function changeRGB(r,g,b){
    r = r*0.9;
    g =+ g*0.9;
    b = b*0.9;
    if (r>255) r=255;
    if (g>255) g=255;
    if (b>255) b=255;

    color=`rgb(${Math.round(r)},${Math.round(g)}, ${Math.round(b)})`;
    return  color;
}

function isDrawingActivated() {
    if (isClicked===false){
        isClicked=true;
    }else {
        isClicked=false;
    }
}

function LightItUp(color){
    boxes.forEach(box => {
        box.addEventListener('click', isDrawingActivated);
        
        box.addEventListener('mouseover', function lighBox(){
            if (isClicked===true){
                if (rainbowActivated) {
                    box.style.backgroundColor = rainbowMode();
                } 
                else if (gradientActivated) {
                    box.style.backgroundColor = gradientMode(box.style.backgroundColor);
                }
                else if (eraser){
                        box.style.backgroundColor = DEFAULTCOLOR;
                }
                else {
                    if  (COLORPICKER.value !== RGBToHex(DEFAULTHOVERCOLOR)){
                        resetInitialParameters();
                        box.style.backgroundColor = COLORPICKER.value;
                    } else {
                    box.style.backgroundColor = color;
                    }
                } 
            }
        })
    })  
}

function resetInitialParameters(){
    clearButtonFunctions();
    color = DEFAULTHOVERCOLOR;
}

function clearButtonFunctions() {
    rainbowActivated = false;
    eraser = false;
    gradientActivated = false;
}

function RGBToHex(str) {
    let vals = str.substring(4, str.length-1).replace(/ /g, '').split(',');
      r= +vals[0];
      g= +vals[1];
      b= +vals[2];

    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);

    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
  
    return "#" + r + g + b;
  }

  function hexToRGB(color) {
    color = color.substring(1);   // remove the #before the hex color string
    let colorSplit = [];

    for (let index = 0; index < color.length; index += 2) {    // split the hex color string every 2 characters
    colorSplit.push(color.slice(index, index + 2));
  }
  for (let j=0 ; j<colorSplit.length ; j++) {
      colorSplit[j] = parseInt(colorSplit[j], 16);
  }

  colorSplit = colorSplit.join(',');
  color = `rgb(${colorSplit})`
}

//program's start, end of functions init

BACKGROUNDPICKER.setAttribute('value', RGBToHex(DEFAULTCOLOR));

createGrid(rows, columns);  //creates the first grid when user load the page

COLORPICKER.setAttribute('value' , RGBToHex(color));

SLIDER.setAttribute('value', rows);

SLIDER.addEventListener('click', function adjustSize(){  //link the slider value with the number of rows of the grid
    let newRows=this.value;
    if (newRows!==rows){
        rows = newRows;
        deleteCurrentGrid();
        resetInitialParameters();
        createGrid(rows, columns);
    }
})

CLEARBUTTON.addEventListener('click', function clearGrid(){
    deleteCurrentGrid();
    resetInitialParameters();
    createGrid(rows, columns);
})

RAINBOWBUTTON.addEventListener('click', function rainbow(){
    gradientActivated = false;
    eraser = false;
    (rainbowActivated===false)? rainbowActivated=true : rainbowActivated=false;
    if (rainbowActivated === false) color = DEFAULTHOVERCOLOR;
    LightItUp(color);
})

GRADIENTBUTTON.addEventListener('click', function gradient(){
    rainbowActivated = false;
    eraser = false;
    (gradientActivated ===false)? gradientActivated =true : gradientActivated =false;
    if (gradientActivated === false) color = DEFAULTHOVERCOLOR;
    LightItUp(color);
})

ERASERBUTTON.addEventListener('click', function eraseFctn(){
    rainbowActivated = false;
    gradientActivated = false;
    (eraser===false)? eraser=true : eraser=false;
    LightItUp(color);
})

BACKGROUNDPICKER.addEventListener('change', function(){
    deleteCurrentGrid();
    resetInitialParameters();
    createGrid(rows, columns);
})

BORDERS.addEventListener ('click', function toggleBorders(){
    boxes.forEach(box => {
        box.classList.toggle('borderToggle');
    })
})