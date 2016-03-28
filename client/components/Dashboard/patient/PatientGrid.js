const React = require('react');
// import React from 'react';
// const _ = require('lodash');
const Row = require('react-bootstrap').Row;
const Grid = require('react-bootstrap').Grid;
// const AddInfo = require('./AddInfo');

// Patient Panels
const AllergiesPanel = require('./PatientInfo/Allergies');
const EyePanel = require('./PatientInfo/EyeRX');
const FamilyHistory = require('./PatientInfo/FamilyHistory');
const Insurance = require('./PatientInfo/Insurance');
const Pharmacy = require('./PatientInfo/Pharmacy');

// const PatientGrid = ({removeFamCond, addFamCond, removeAllergy, addAllergy, removeEye, addEye, allergies, eyerx, family, familyhistory, insurance, pharmacy, rx}) => {
// return(
//   <div className="patient-container">
//     <div className="container-fluid">
//     <Grid className="patient-grid">
//       <Row className="show-grid">

//          <AllergiesPanel removeAllergy={removeAllergy} addAllergy={addAllergy} allergies={allergies} />
//          <EyePanel removeEye={removeEye} addEye={addEye} eyerx={eyerx} />
//          <FamilyHistory removeFamCond={removeFamCond} addFamCond={addFamCond} family={family} familyhistory={familyhistory} />

//       </Row>
//     </Grid>
//     </div>
//   </div>
//   )
// }

const PatientGrid = ({states, dispatches}) => {
return(
  <div className="patient-container">
    <div className="container-fluid">
    <Grid className="patient-grid">
      <Row className="show-grid">

          <AllergiesPanel removeAllergy={dispatches.removeAllergy} addAllergy={dispatches.addAllergy} allergies={states.allergies} />
          <EyePanel removeEye={dispatches.removeEye} addEye={dispatches.addEye} eyerx={states.eyerx} />
          <FamilyHistory removeFamCond={dispatches.removeFamCond} addFamCond={dispatches.addFamCond} family={states.family} familyhistory={states.familyhistory} />

      </Row>
    </Grid>
    </div>
  </div>
  )
}

module.exports = PatientGrid;
