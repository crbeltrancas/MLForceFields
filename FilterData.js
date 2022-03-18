//jshint esversion:6
// require('@tensorflow/tfjs-node');
// const tf = require('@tensorflow/tfjs');
const fs = require('fs');
const _ = require('lodash');
const loadCSV = require('./load-csv');
const dataForge = require('data-forge');require('data-forge-fs');

/*
 * This is the variable to load the data from the csv files
 */
const atomType = loadCSV('data/AtomTypeDefinitions.csv');
const angleBending = loadCSV('data/AngleBendingParameters.csv');
const bondStretching = loadCSV('data/BondStretchingParameters.csv');
const torsion = loadCSV('data/TorsionalParameters.csv');
const vanderWall = loadCSV('data/VanderWaalsParameters.csv');

/*
    * This the classs that will select the information we need for the calculation
    * of the force fields with different molecules, here we will search and select that data 
    * that has realtion within all the parameters needed for the calculation.
    */
class Molecule {
    //#region constructor
    constructor(atomReference) {
        this.atomReference = atomReference;
        this.molecule ={
            atomValue : [],
            angleValue : [],
            bondValue : [],
            torsionValue : [],
            vdwValue : [],
        };
    }
    //#endregion

    //#region Molecule Selection function.
    /*
        * This is where we loop through the atom type data and select molecule
        *  to be added for calculation and converted into a variable and transformed into an object
        */
    moleculeSelection() {
        // loop the outer array
        for (let i = 0; i < atomType.length; i++) {
            if (atomType[i] === this.atomReference) {
                this.molecule.atomValue.push(atomType[i]);
                // return this;
                // this.molecule.atomValue = new dataForge.DataFrame(this.molecule.atomValue)
                // .dropSeries("Columns")            
                // .dropSeries("0")             
                // .dropSeries("5")             
                // .dropSeries("6")            
                // .dropSeries("7")             
                // .toArray();                
            }
        }

        return this;
    }
    //#endregion

    //#region Bond Selection function.
    /**
        * This is where we loop through the bond Stretching data and select the values
        *  to be added for calculation and converted into a variable and transformed into an object
        */
     bondSelection() {
        // loop the outer array
        for (let i = 0; i < bondStretching.length; i++) {
            // get the size of the inner array
            let innerArrayLength = bondStretching[i].length;
            // loop the inner array
            for (let j = 0; j < innerArrayLength; j++) {
                if (bondStretching[i][j] === this.atomReference[2]) {
                    this.molecule.bondValue.push(bondStretching[i]);
                    this.molecule.bondValue = _.union(this.molecule.bondValue);
                    this.molecule.bondValue = new dataForge.DataFrame(this.molecule.bondValue)
                    .dropSeries("Columns")          
                    .dropSeries("0")            
                    .toArray();                

                }
            }
        }
        return this;
    }
    //#endregion

    //#region  Angle Bending Selection function.
    /**
        * This is where we loop through the Angle Bending data and select the values
        *  to be added for calculation and converted into a variable and transformed into an object
        */
        
    angleSelection() {
        // loop the outer array
        for (let i = 0; i < angleBending.length; i++) {
            // get the size of the inner array
            let innerArrayLength = angleBending[i].length;
            // loop the inner array
            for (let j = 0; j < innerArrayLength; j++) {
                if (angleBending[i][j] === this.atomReference[2]) {
                    this.molecule.angleValue.push(angleBending[i]);
                    this.molecule.angleValue = _.union(this.molecule.angleValue);
                    // this.molecule.angleValue = new dataForge.DataFrame(this.molecule.angleValue)
                    // .dropSeries("Columns")        
                    // .dropSeries("0")             
                    // .toArray();                 
                }
            }
        }
        return this;
    }
    //#endregion

    //#region Torsion Selection function.
    /**
         * This is where we loop through the Torsional data and select the values
         *  to be added for calculation and converted into a variable and transformed into an object
         */
    torsionSelection() {
        // loop the outer array
        for (let i = 0; i < torsion.length; i++) {
            // get the size of the inner array
            let innerArrayLength = torsion[i].length;
            // loop the inner array
            for (let j = 0; j < innerArrayLength; j++) {
                if ((torsion[i][1] && torsion[i][2] && torsion[i][3] && torsion[i][4]) === this.atomReference[2] ) {
                    this.molecule.torsionValue.push(torsion[i]);
                    this.molecule.torsionValue = _.union(this.molecule.torsionValue);
                    // this.molecule.torsionValue = new dataForge.DataFrame(this.molecule.torsionValue)
                    // .dropSeries("Columns")             
                    // .dropSeries("0")               
                    // .toArray();                  
                }
            }
        }
        return this;
    }
    //#endregion

    //#region Vanderwall Selection function.
    /**
        * This is where we loop through the Wanderwall values data and select the values
        *  to be added for calculation and converted into a variable and transformed into an object
        */
    vanderWallSelection() {
        // loop the outer array
        for (let i = 0; i < vanderWall.length; i++) {
            // get the size of the inner array
            let innerArrayLength = vanderWall[i].length;
            // loop the inner array
            for (let j = 0; j < innerArrayLength; j++) {
                if (vanderWall[i][j] === this.atomReference[1]) {
                    this.molecule.vdwValue.push(vanderWall[i]);
                    // this.molecule.vdwValue = new dataForge.DataFrame(this.molecule.vdwValue)
                    // .dropSeries("Columns")              
                    // .dropSeries("0")              
                    // .toArray();                  
                }
            }
        }
        return this;
    }
    //#endregion

    //#region Selected Values function.
    selectedValues(){
        this.moleculeSelection();
        this.angleSelection();
        this.bondSelection();
        this.torsionSelection();
        this.vanderWallSelection();
    }
    //#endregion
}

function molReference (referenceMol){
    let reference = new Molecule();
    reference.atomReference = referenceMol;
    reference.selectedValues();
    return reference;
}

// module.exports = Molecule;
module.exports = molReference;











