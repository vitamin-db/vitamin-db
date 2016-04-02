const React              = require('react');
const connect            = require('react-redux').connect;

const browserHistory     = require('react-router').browserHistory;
const bindActionCreators = require('redux').bindActionCreators;
const mock               = require('../model/mockData');
const Grid               = require('react-bootstrap').Grid;

// components
const DoctorGrid         = require('../components/Dashboard/doctor/DoctorGrid');
const PatientGrid        = require('../components/Dashboard/patient/PatientGrid');

// actions
const allergyAction      = require('../actionCreators/allergyActions');
const doctorAction       = require('../actionCreators/doctorActions');
const stateAction        = require('../actionCreators/stateActions');
const eyeAction          = require('../actionCreators/eyeActions');
const famAction          = require('../actionCreators/familyActions');
const pharmAction        = require('../actionCreators/pharmActions');
const insAction          = require('../actionCreators/insuranceActions');
const apptAction         = require('../actionCreators/appointmentActions');
const DashDisp           = require('./ContainerHelpers/DashDispatches');


// const Home = ({states, dispatches}) => {
//   return (
//     <div className="home-body">
//       <DoctorGrid editPharm={dispatches.editPharm} addMyDoc={dispatches.addMyDoc} addAppointment={dispatches.addAppointment} removePharm={dispatches.removePharm} 
//         addPharm={dispatches.addPharm} addIns={dispatches.addIns} removeIns={dispatches.removeIns} editDoc={dispatches.editDoc} 
//         removeDoc={dispatches.removeDoc} addDoc={dispatches.addDoc} docApiList={states.docApiList} searchDoc={dispatches.searchDoc} 
//         docInfo={states.doctor} insurance={states.insurance} pharmacy={states.pharmacy} editIns={dispatches.editIns}/>
//       <PatientGrid removeFamCond={dispatches.removeFamCond} addFamCond={dispatches.addFamCond} removeAllergy={dispatches.removeAllergy} 
//         addAllergy={dispatches.addAllergy} removeEye={dispatches.removeEye} addEye={dispatches.addEye} 
//         allergies={states.allergies} eyerx={states.eyerx} family={states.family}
//         insurance={states.insurance} pharmacy={states.pharmacy} familyhistory={states.familyhistory} 
//         rx={states.rx} appt={states.appt} />
//     </div>
//   );
// };

const Home = ({states, dispatches}) => {
  return (
    <div className="home-body">
      <DoctorGrid states={states} dispatches={dispatches} />
      <PatientGrid states={states} dispatches={dispatches}/>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  // console.log(mock.allergies)
  return {
    states:{ 
      doctor: state.userinfo.doctors,
      allergies: state.allergy,
      eyerx: state.userinfo.eyerx,
      family: state.family,
      insurance: state.insurance,
      pharmacy: state.pharmacy,
      familyhistory: state.family,
      rx: state.rx,
      docApiList: state.docapi,
      appt: state.appoint
    }
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatches: {
      searchDoc: (e) => {
        e.preventDefault();
        var result = DashDisp.searchDoc(e);
        dispatch(doctorAction.GetApiDocs(result));
      },
      addDoc: (doc) => {
        var result = DashDisp.addDoc(doc);
        var portrait = doc.portrait;
        dispatch(doctorAction.AddMyDoc(result, portrait));
      },
      removeDoc: (id) => {
        dispatch(doctorAction.RemoveMyDoc(id));
      },
      addMyDoc: (e) => {
        e.preventDefault();
        var defPortrait = "https://asset1.betterdoctor.com/assets/general_doctor_male.png";
        var result = DashDisp.addMyDoc(e);
        dispatch(doctorAction.AddMyDoc(body, defPortrait));
      },
      editDoc: (id, e) => {
        e.preventDefault();
        var result = DashDisp.editDoc(id,e);
        dispatch(doctorAction.ChangeMyDoc(result));
      },
      addEye: (e) => {
        e.preventDefault();
        var result = DashDisp.addEye(e);
        dispatch(eyeAction.AddEyeRx(result));
      },
      removeEye: (id) => {
        dispatch(eyeAction.RemoveEyeRx(id));
      },
      addAllergy: (e) => {
        e.preventDefault();
        var result = DashDisp.addAllergy(e);
        dispatch(allergyAction.AddAllergy(result));
      },
      removeAllergy: (id) => {
        dispatch(allergyAction.RemoveAllergy(id));
      },
      removeIns: (id) => {
        dispatch(insAction.RemoveIns(id));
      },
      addIns: (e) => {
        e.preventDefault();
        var result = DashDisp.addIns(e);
        dispatch(insAction.AddIns(result));
      },
      editIns: (id, e) => {
        e.preventDefault();
        var result = DashDisp.editIns(id, e);
        dispatch(insAction.EditIns(result));
      },
      addPharm: (e) => {
        e.preventDefault();
        var result = DashDisp.addPharm(e);
        dispatch(pharmAction.AddPharm(result));
      },
      removePharm: (id) => {
        dispatch(pharmAction.RemovePharm(id));
      },
      editPharm: (id, e) => {
        e.preventDefault();
        var result = DashDisp.editPharm(id, e);
        dispatch(pharmAction.EditPharm(result));
      },
      // addFamCond: (e) => {
      //   e.preventDefault();
      //   console.log("addfamcond target", e.target)
      //   // DashDisp.addFamCond(e)
      //   //   .then((res) => {
      //   //     console.log("addfam res", res);
      //   //     dispatch(famAction.AddFam(res));
      //   //   })
      //   var member = {name: e.target.member.value};
      //   famAction.AddMember(member)
      //     .then((response) => {
      //       var result = DashDisp.addFamCond(e);
      //       dispatch(famAction.AddFam(result, response.name))
      //     })
      //     .catch((err) => {
      //       console.error("add fam action err", err);
      //     })
      // },
      addFamCond: (e) => {
        e.preventDefault();
        var member = {
          properties:{name: e.target.member.value}
        };
        var condition = e.target.condition.value;
        famAction.AddMember(member)
          .then((obj) => {
            var body = {
              properties: {
               condition: condition,
               id_familymember: obj.id
              }
            };
            dispatch(famAction.AddFam(body, obj.name));
          })
      },
      removeFamCond: (id) => {
        dispatch(famAction.RemoveFam(id));
      },
      addAppointment: (date, time, id) => {
        var result = DashDisp.addAppointment(date, time);
        dispatch(apptAction.AddAppointment(result, id));
      }
    }
  };
};

var wrappedHome = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

module.exports = wrappedHome;