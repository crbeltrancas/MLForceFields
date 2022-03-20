const fs = require('fs');
const _ = require('lodash');

/*
* This function will load the information need it 
from the CSV file and turn it into arrays for calculation
*/
function loadCSV(filename){

  const headers = [];
  /*
  * This will read the CVS file and separate the text into different arrays of data.
  */
  let data = fs.readFileSync(filename, {encoding: 'utf-8'});

  data = data
  .split('\n')
  .map(row => row.split(',') 
  .map(row => row.split(' ')
  .filter(element => {return element != null && element != ''})
  ));

  /*
  * This will concat and filter the empty arrays and the ones 
  that are undefine to clean the data better.
  */
  data = [].concat.apply([], data);

  data = data.filter(function(obj){
    return obj[0] !== undefined;
  });

      /* 
    * This will add a new array of array that will be the base to create columns
    for separating values in the data by columns
     */
    const dataHeaders = data.unshift(headers);

  /* 
  * This is where the data is parse for those values that are numerical 
  */
  data = data.map((row, index) =>{
    if (index === 0) {
      return row;
    }

      return row.map((element, index) =>{
            const result = parseFloat(element);
            return _.isNaN(result) ? element : result;
        });
    });

    data.shift();

  return data;
  // console.log(data);
}

module.exports = loadCSV;

// loadCSV('data/TorsionalParameters.csv');

