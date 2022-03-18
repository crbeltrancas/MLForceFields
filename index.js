//jshint esversion:6
// require('@tensorflow/tfjs-node');
// const tf = require('@tensorflow/tfjs');
const fs = require('fs');
const _ = require('lodash');
const loadCSV = require('./load-csv');
const dataForge = require('data-forge'); require('data-forge-fs');
let molReference = require('./FilterData');
let Molecule = require('./FilterData');

/*
 * This is the variable to load the data from the csv files
 */
const atomType = loadCSV('data/AtomTypeDefinitions.csv');


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


/*
 * This is where we log for the values for the parameters parameteres we want to use for calculation
 */

// console.log(reference1.molecule);
// console.log(reference2.molecule);
// console.log(reference3.molecule);


let referenceAtomValues = _.union(reference1.molecule.atomValue,reference2.molecule.atomValue,reference3.molecule.atomValue);
console.log(referenceAtomValues);


let referenceBondValues = _.union(reference1.molecule.bondValue,reference2.molecule.bondValue,reference3.molecule.bondValue);
console.log(referenceBondValues);

let referenceAngleValues = _.union(reference1.molecule.angleValue,reference2.molecule.angleValue,reference3.molecule.angleValue);
console.log(referenceAngleValues);

let referenceTorsionValues = _.union(reference1.molecule.torsionValue,reference2.molecule.torsionValue,reference3.molecule.torsionValue);
console.log(referenceTorsionValues);

let referenceVDWValues = _.union(reference1.molecule.vdwValue,reference2.molecule.vdwValue,reference3.molecule.vdwValue);
console.log(referenceVDWValues);





/**
 * This is where we transform our data for processing 
 */
  

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