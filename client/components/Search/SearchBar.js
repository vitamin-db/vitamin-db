// import React, { Component } from 'react';

// export default class AppointmentView extends Component {
//   render() {
//     return (
//       <form className="input-group">
//         <input />
//       </form>
//     )
//   }
// }
const React = require('react');
const Input = require('react-bootstrap').Input;
const ButtonInput = require('react-bootstrap').ButtonInput;


const SearchBar = ({onAdd}) => {

// getInitialState () {
// 	return {
// 	term: ''
//   }
// },

// onInputChange = ({event}) => {
// 	console.log(event.target.value)
// },

 return (
  <div>
    <form className="input-group" onSumbit={onAdd}>
      <input
      	placeholder="Search Doctor"
      	className="form-control"

      />
      <span className="input-group-btn">
        <button type="submit" className="btn btn-secondary">Submit</button>
      </span>
    </form>
  </div>
  );

}

module.exports = SearchBar;