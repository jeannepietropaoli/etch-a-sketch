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
    rows = prompt('How many squares per lign do you want the new grid to be?(1 to 99)');
    while(rows<=0 || rows>99){
        alert('out of limit, choose a number between 1 and 99 included');
        rows = prompt('How many squares per lign do you want the new grid to be?(1 to 99)');
    }

    deleteCurrentGrid();  
    createGrid(rows, columns);
    boxes.forEach(box => {
        box.classList.remove('lightItUp');
    })
})
