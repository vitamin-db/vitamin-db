const React = require('react');
const FormControls = require('react-bootstrap').FormControls.Static;
const Table = require('react-bootstrap').Table;
const Col = require('react-bootstrap').Col;

const UserProfile = ({userInfo, email, phone}) => {
  console.log("UserProfile: ", userInfo)
  return(
   
    <Col xs={12} md={10} mdOffset={1} className="scheduleContent">
    <h1>{userInfo}'s Profile View</h1>
      <Table responsive>
        <thead>
          <th></th>
          <tr>
            <th>USERNAME</th>
            <td> {userInfo} </td>
            <td>EDIT BUTTON</td>
          </tr>
          <tr>
            <th>PHONE NUMBER</th>
            <td> {phone} </td>
            <td>EDIT BUTTON</td>
          </tr>
          <tr>
            <th>E-MAIL</th>
            <td> {email} </td>
            <td>EDIT BUTTON</td>
          </tr>
          <tr>
            <th>PASSWORD</th>
            <td> </td>
            <td>EDIT BUTTON</td>
          </tr>   
        </thead> 
      </Table>
    </Col>
  )
};
module.exports = UserProfile;
