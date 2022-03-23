const _ = require('lodash');
const loadCSV = require('./load-csv');
let molReference = require('./FilterData');

// --------------------------------------------------------------------------

/*
 * This is the variable to load the data from the csv files
 */
const atomType = loadCSV('data/AtomTypeDefinitions.csv');

// --------------------------------------------------------------------------

/*
 * This is where we create an instance of the molecules we want to use for calculation
 * Please enter how many molecules are you going to use for computation. 
 * This is where we create the references for molecules we want to search
 * This is where we call for the values of the molecules in the parameteres we want to use for calculation
 * Please select molecules from the AtomTypeDefinition list
 */

let reference1 = molReference(atomType[218]);
let reference2 = molReference(atomType[219]);
let reference3 = molReference(atomType[220]);

// --------------------------------------------------------------------------

/**
* This is where we join the values found for the parameters, in here we need to enter the number of references
*/

let referenceAtomValues = _.union([reference1.atomReference],[reference2.atomReference],[reference3.atomReference]);
let referenceBondValues = _.union(reference1.molecule.bondValue,reference2.molecule.bondValue,reference3.molecule.bondValue);
let referenceAngleValues = _.union(reference1.molecule.angleValue,reference2.molecule.angleValue,reference3.molecule.angleValue);
let referenceTorsionValues = _.union(reference1.molecule.torsionValue,reference2.molecule.torsionValue,reference3.molecule.torsionValue);
let referenceVDWValues = _.union(reference1.molecule.vdwValue,reference2.molecule.vdwValue,reference3.molecule.vdwValue);

// --------------------------------------------------------------------------

//#region Remove Columns not used.
/*
 * This is where we remove the columns that we dont need and they are not part of the calculation 
 */

referenceAtomValues = referenceAtomValues.map(function(val) {return val.slice(1, 3);});

referenceBondValues = referenceBondValues.map(function(val) {return val.slice(1, 5);});
  
referenceAngleValues = referenceAngleValues.map(function(val) {return val.slice(1, 6);});

referenceTorsionValues = referenceTorsionValues.map(function(val) {return val.slice(1, 14);});

referenceVDWValues = referenceVDWValues.map(function(val) {return val.slice(1, 4);});

//#endregion

// --------------------------------------------------------------------------

console.table(referenceAtomValues);
console.table(referenceBondValues);
console.table(referenceAngleValues);
console.table(referenceTorsionValues);
console.table(referenceVDWValues);

// --------------------------------------------------------------------------

//#region filter Bond values.
/**
 * This is where we filter even more the Bond values
 */

let bondIndex= [];
for (let i = 0; i < referenceAtomValues.length ; i++) {
    for (let j = 0; j< referenceBondValues.length;  j++){
        if(referenceBondValues[j][0] == referenceAtomValues[i][1]){
            bondIndex.push(referenceBondValues[j]);
        }
    }          
}

let bondValues = [];
for (let i = 0; i < referenceAtomValues.length ; i++) {
    for (let j = 0; j< bondIndex.length;  j++){
        if(bondIndex[j][1] == referenceAtomValues[i][1]){
            bondValues.push(bondIndex[j]); 
        }
    }          
}

bondIndex = null;
//#endregion

// --------------------------------------------------------------------------

//#region filter Angle values.
/**
 * This is where we filter even more the Angle values
 */

let angleIndex = [];
for (let i = 0; i < referenceAtomValues.length ; i++) {
    for (let j = 0; j< referenceAngleValues.length;  j++){
        if(referenceAngleValues[j][0] == referenceAtomValues[i][1]){
            angleIndex.push(referenceAngleValues[j]);
        }
    }          
}
 
let angleIndex1 = [];
for (let i = 0; i < referenceAtomValues.length ; i++) {
    for (let j = 0; j< angleIndex.length;  j++){
        if(angleIndex[j][1] == referenceAtomValues[i][1]){
            angleIndex1.push(angleIndex[j]); 
        }
    }          
}

let angleValues = [];
for (let i = 0; i < referenceAtomValues.length ; i++) {
    for (let j = 0; j< angleIndex1.length;  j++){
        if(angleIndex1[j][2] == referenceAtomValues[i][1]){
            angleValues.push(angleIndex1[j]); 
        }
    }          
}

angleIndex = null;
angleIndex1 = null;

//#endregion

// --------------------------------------------------------------------------

//#region filter Torsion values.
/**
 * This is where we filter even more the Torsional values
 */

let torsionIndex = [];
for (let i = 0; i < referenceAtomValues.length ; i++) {
    for (let j = 0; j< referenceTorsionValues.length;  j++){
        if(referenceTorsionValues[j][0] == referenceAtomValues[i][1]){
            torsionIndex.push(referenceTorsionValues[j]);
        }
     }          
 }
  
let torsionIndex1 = [];
for (let i = 0; i < referenceAtomValues.length ; i++) {
    for (let j = 0; j< torsionIndex.length;  j++){
        if(torsionIndex[j][1] == referenceAtomValues[i][1]){
            torsionIndex1.push(torsionIndex[j]); 
        }
    }          
}

let torsionIndex2 = [];
for (let i = 0; i < referenceAtomValues.length ; i++) {
    for (let j = 0; j< torsionIndex1.length;  j++){
        if(torsionIndex1[j][2] == referenceAtomValues[i][1]){
            torsionIndex2.push(torsionIndex1[j]); 
        }
    }          
}

let torsionValues = [];
for (let i = 0; i < referenceAtomValues.length ; i++) {
    for (let j = 0; j< torsionIndex2.length;  j++){
        if(torsionIndex2[j][3] == referenceAtomValues[i][1]){
            torsionValues.push(torsionIndex2[j]); 
        }
    }          
}

torsionIndex = null;
torsionIndex1= null;
torsionIndex2= null;

//#endregion

// --------------------------------------------------------------------------

//#region Clear up memory just in case.
reference1 = null;
reference2 = null;
reference3 = null;

let atomValues = referenceAtomValues;
let vdwValues = referenceVDWValues;
referenceAtomValues = null;
referenceBondValues = null;
referenceAngleValues =null;
referenceTorsionValues = null;
referenceVDWValues = null;

//#endregion

// --------------------------------------------------------------------------

console.log('Atom Values');
console.table(atomValues);
console.log('Bond Values' );
console.table(bondValues);
console.log('Angle Values');
console.table(angleValues);
console.log('Torsion Values');
console.table(torsionValues);
console.log('VanderWall Values');
console.table(vdwValues);

// --------------------------------------------------------------------------



///++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

/**
 * This is where the class for the model will go
 */


/**
 * This is where the code for the training the algorithm will go
 */



/**
 * This is where the code for the  prediction will go
 */

  

  /**
 * This is where the code for standarization if needed will go
 */

  

  /**
 * This is where the code for update of the learning rate will go
 */


/**
 * This is where it ends 
 */