let rows = 30;
let columns;
let column;
let container = document.querySelector('.container');
const CLEARBUTTON = document.querySelector('.clearButton');
let boxes;

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
        }
    }
    boxes = document.querySelectorAll('.box');

    LightItUp();
}

function LightItUp(){
    boxes.forEach(box => {
        box.addEventListener('mouseover', function lighBox(){
            box.classList.add('lightItUp');
        })
    });
}

function deleteCurrentGrid(){
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
}

//program's start, end of functions init

createGrid(rows, columns);  //creates the first grid when user load the page

CLEARBUTTON.addEventListener('click', function clearGrid(){
    rows = prompt('How many squares do you want the new grid to be?');
    deleteCurrentGrid();  
    createGrid(rows, columns);

    boxes.forEach(box => {
        box.classList.remove('lightItUp');
    })
})
