const React = require('react');
const Table = require('react-bootstrap').Table;
const Col = require('react-bootstrap').Col;

const UserProfile = React.createClass({
  getInitialState: function() {
    return{show: true};
  },
  toggleShow: function() {
    var newState = !this.state.show;
    this.setState({show: newState});
    alert('Changing information will log you out');
  },
  render: function() {
    return (
      <Col xs={12} md={12} className="scheduleContainer">
      <Col xs={12} md={10} mdOffset={1} className="scheduleContent">
        <h1> {this.props.userInfo}'s Profile View</h1>
       {this.state.show && <div className="profile-table">
       <Table responsive>
         <thead>
           <tr>
             <th>USERNAME</th>
             <td> {this.props.userInfo} </td>
           </tr>
           <tr>
             <th>PHONE NUMBER</th>
             <td> {this.props.phone} </td>
           </tr>
           <tr>
             <th>E-MAIL</th>
             <td> {this.props.email} </td>
           </tr>
           <tr>
             <th>PASSWORD</th>
             <td>******</td>
           </tr>
           <tr>   
             <th><button onClick={this.toggleShow}>EDIT {this.props.userInfo}'s Profile</button></th>
           </tr>
         </thead> 
       </Table>
       </div>}
       {!this.state.show && <div className="profile-table">
        <h4>Not all fields are required.</h4>
        <form onSubmit={this.props.editInfo}>
          <input name="username" placeholder="Username" />
          <input name="phone" placeholder="Phone Number"/>
          <input name="email" placeholder="E-Mail"/>
          <input type="password" name="password" placeholder="Password"/>
          <button type="submit">Submit</button>
        </form>
       </div>}
      </Col>
   </Col>
    )
  }
})

// const UserProfile = ({userInfo, email, phone}) => {
//   console.log("UserProfile: ", userInfo)
//   return(
   
//     <Col xs={12} md={12} className="scheduleContainer">
//     <Col xs={12} md={10} mdOffset={1} className="scheduleContent">
//     <h1>{userInfo}'s Profile View</h1>
//       <Table responsive>
//         <thead>
//           <tr><th></th></tr>
//           <tr>
//             <th>USERNAME</th>
//             <td> {userInfo} </td>
//             <td><button onClick={this.toggleShow}>EDIT</button></td>
//           </tr>
//           <tr>
//             <th>PHONE NUMBER</th>
//             <td> {phone} </td>
//             <td>EDIT BUTTON</td>
//           </tr>
//           <tr>
//             <th>E-MAIL</th>
//             <td> {email} </td>
//             <td>EDIT BUTTON</td>
//           </tr>
//           <tr>
//             <th>PASSWORD</th>
//             <td></td>
//             <td>EDIT BUTTON</td>
//           </tr>   
//         </thead> 
//       </Table>
//     </Col>
//   </Col>
//   )
// };
module.exports = UserProfile;
