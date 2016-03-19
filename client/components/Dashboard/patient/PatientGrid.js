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

const PatientGrid = ({allergies, eyerx, family, familyhistory, insurance, pharmacy, rx}) => {

return(
  <div className="patient-container">
    <div className="container-fluid">
    <Grid className="patient-grid">
      <Row className="show-grid">

      		<AllergiesPanel allergies={allergies} />
      		<EyePanel eyerx={eyerx} />
      		<FamilyHistory family={family} familyhistory={familyhistory} />

      </Row>
    </Grid>
    </div>
  </div>
  )

}


module.exports = PatientGrid;
