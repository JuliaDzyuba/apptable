const CODES = {
  A: 65,
  Z: 90
};

function toCell() {
  return `<div class="cell" contenteditable> </div>
  `;
}

function toColumn(col) {
  return `<div class="column">${col}</div>
  `;
}

function createRow(num, content) {
  return `<div class="row">
      <div class="row-info">${num ? num : ''}</div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toChar ( _, index) {
  return String.fromCharCode(CODES.A + index)
}



export function createTable(rowsCount = 15) {
  // 'A'.charCodeAt() --> 65
  // 'Z'.charCodeAt() --> 90
  // String.fromCharCode(65) --> 'A'
  // String.fromCharCode(90) --> 'Z'

  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
// создаем массив значений столбцов с заданным кол-вом 
  const cols = new Array(colsCount).fill('')
    // заполняем массив нужными данными
            // .map((el, index) => {
            //   return String.fromCharCode(CODES.A + index)
            // })
      .map(toChar)
    // перебираем массив и для каждого значения создаем колонку
            // .map( el => {
            //   return createCol(el);
            // })
      .map(toColumn)
    // приводим массив к строке
      .join('');

  

  rows.push(createRow(null, cols));
  console.log(rows);

  for(let i = 0; i < rowsCount; i++){
    const cells = new Array(colsCount)
      .fill('')
      .map(toCell)
      .join('')

    rows.push(createRow(i+1, cells));
  };


  return rows.join('');
}