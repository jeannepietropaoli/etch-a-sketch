let rows = 30;
let columns;
let column;
let container = document.querySelector('.container');
const CLEARBUTTON = document.querySelector('.clearButton');
const RAINBOWBUTTON = document.querySelector('.rainbowMode');
const GRADIENTBUTTON = document.querySelector('.gradient');
const ERASERBUTTON = document.querySelector('.eraser');
let rainbowActivated = false;
let gradientActivated = false;
let boxes;
const DEFAULTCOLOR= 'rgb(255,255,255)';
const DEFAULTHOVERCOLOR='rgb(255,20,100)';
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
                box.style.backgroundColor= DEFAULTCOLOR;
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

function returnChangedColor(colorToAlter){
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
    console.log(color);
    return  color;
}

function getRGBValues(str) {
    let vals = str.substring(str.indexOf('(') +1, str.length -1).split(', ');
      r= +vals[0],
      g= +vals[1],
      b= +vals[2]
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
                    box.style.backgroundColor = returnChangedColor(box.style.backgroundColor);
                }
                else {
                    console.log(box.style.backgroundColor);
                    box.style.backgroundColor = color;
                    console.log(box.style.backgroundColor);
                } 
            }
        })
    })  
}

function resetInitialParameters(){
    rainbowActivated = false;
    gradientActivated = false;
    color = DEFAULTHOVERCOLOR;
}

//program's start, end of functions init

createGrid(rows, columns);  //creates the first grid when user load the page

CLEARBUTTON.addEventListener('click', function clearGrid(){
    rows = prompt('How many squares per lign do you want the new grid to be?(1 to 99)');
    while(rows<=0 || rows>99){
        alert('out of limit, choose a number between 1 and 99 included');
        rows = prompt('How many squares per lign do you want the new grid to be?(1 to 99)');
    }
    deleteCurrentGrid();
    resetInitialParameters();
    createGrid(rows, columns);
    boxes.forEach(box => {
        box.classList.remove('lightItUp');
    })
})

RAINBOWBUTTON.addEventListener('click', function rainbow(){
    resetInitialParameters();
    rainbowActivated = true;
    LightItUp(color);
})

GRADIENTBUTTON.addEventListener('click', function gradient(){
    resetInitialParameters();
    gradientActivated = true;
    LightItUp(color);
})

ERASERBUTTON.addEventListener('click', function erase(){
    resetInitialParameters();
    color = 'rgb(255,255,255)';
    LightItUp(color);
})


