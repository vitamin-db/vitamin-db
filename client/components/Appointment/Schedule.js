const React = require('react');
const Table = require('react-bootstrap').Table;
const Col = require('react-bootstrap').Col;
const TextField = require('material-ui/lib/text-field');
const Toggle = require('material-ui/lib/toggle');
const Button = require('react-bootstrap').Button;
const AddButton = require('./newImmun');

const Schedule = ({doctor, immunization, appointment, addImmun, removeAppt}) => {

    {appointment.map((appt) => {
      for(var i = 0; i < appt.length; i++) {
        for(var j = 0; j < doctor.length; j++) {
          if(doctor[j].id_doctor === appt[i].id_user_doctor) {
              appt[i] = Object.assign(appt[i], doctor[j])
            }
          }
        }
      }
    )
  }

    return(
    <div>
    <Col xs={12} md={12} className="scheduleContainer">
      <Col xs={12} md={10} mdOffset={1} className="scheduleContent">
      <h1>My Appointments</h1>
        <Table responsive>
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Appointment</th>
              <th>Date</th>
              <th>Time</th>
              <th>Cancel</th>
            </tr>
          </thead> 


        {appointment.map((val, count) =>
            <tbody key={count++}>

              {val.map((item) =>
                <tr key={count++}>
                    <td>{item.name}</td> 
                    <td>{item.type}</td> 
                    <td>{new Date(item.date).toLocaleDateString()}</td> 
                    <td>{item.time}</td> 
                    <td><Button onClick={removeAppt.bind(null, item.id_appointment)}>X</Button></td>
              </tr>
              )} 
            </tbody>
        )}


        </Table>
      </Col>


      <Col xs={12} md={10} mdOffset={1} className="scheduleContent">
      <h1>My Immunizations</h1>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Immunizations</th>
              <th>Date</th>
              <th>Upcoming Check-Up</th>
              <th>Notes</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
      {immunization.map((val, count) => 
            <tr key={count++}>
              <td> { count++ }</td>
              <td> { val.type } </td>
              <td> { new Date( val.date ).toLocaleDateString() } </td>
              <td> { new Date( new Date( val.date ).setYear( new Date(val.date).getFullYear()+1 ) ).toLocaleDateString() } </td>
              <td> { val.notes } </td>
              <td> { new Date( new Date( val.date).setYear( new Date(val.date).getFullYear()+1 ) ).toLocaleDateString() > new Date().toLocaleDateString() ? 'Current' : 'Outdated' } </td>

            </tr>
              )}
          </tbody>
        </Table>
        <AddButton addImmun={addImmun} currentDate={immunization.date}/>
      </Col>
    </Col>
   </div>
    )
  };

module.exports = Schedule;