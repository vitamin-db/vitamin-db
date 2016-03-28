const famAction = require('../../actionCreators/familyActions');

module.exports = {
// DOCTORS ---------------------------------------------------------------------------------------
      searchDoc: (e) => {
        e.preventDefault();
        var firstName = e.target.firstname.value;
        var lastName = e.target.lastname.value;
        return {firstname:firstName, lastname:lastName};
      },
      addDoc: (doc) => {
        return { properties: {
          name: doc.firstname + " " + doc.lastname, 
          phone: doc.phone, 
          street_address: doc.address, 
          type_usermade: doc.specialty,
          type: doc.specialty,
          current: false
        }};
        // this jsut clears the api list, but in the future it will add the chosen doctor to the database
      },
      addMyDoc: (e) => {
        e.preventDefault();
        return {
          properties: {
            name: e.target.name.value,
            phone: e.target.phone.value,
            street_address: e.target.address.value,
            type_usermade: e.target.specialty.value,
            type: e.target.specialty.value
          }
        };
      },
      editDoc: (id, e) => {
        e.preventDefault();
        var specialty = e.target.specialty.value;
        var name = e.target.name.value;
        var address = e.target.address.value;
        var phone = e.target.phone.value;
        var newInfo = {
          properties: {
            id_doctor: id
          }
        };
        if(name){
          newInfo.properties.name = name;
        }
        if(address){
          newInfo.properties.address = address;
        }
        if(phone){
          newInfo.properties.phone = phone;
        }
        if(specialty){
          newInfo.properties.type = specialty;
        }
        return newInfo;
      },
// EYERX -------------------------------------------------------------------------------------
      addEye: (e) => {
        e.preventDefault();
        return {properties:{
          sphere_right: e.target.sphere_right.value,
          sphere_left: e.target.sphere_left.value,
          cylinder_right: e.target.cylinder_right.value,
          cylinder_left: e.target.cylinder_left.value,
          axis_right: e.target.axis_right.value,
          axis_left: e.target.axis_left.value,
          add_right: e.target.add_right.value,
          add_left: e.target.add_left.value
        }};
      },
// ALLERGY -----------------------------------------------------------------------------------
      addAllergy: (e) => {
        e.preventDefault();
        return {
          properties: {
            allergen: e.target.allergen.value,
            current: e.target.currently.checked
          }
        };
      },
// INSURANCE ---------------------------------------------------------------------------------
      addIns: (e) => {
        e.preventDefault();
        return {
          properties: {
            plan_name: e.target.provider.value,
            plan_id: e.target.plan.value,
            group_id: e.target.groupid.value,
            rx_bin: e.target.memberid.value
          }
        };
      },
      editIns: (id, e) => {
        e.preventDefault();
        var planname = e.target.planname.value;
        var planid = e.target.planid.value;
        var groupid = e.target.groupid.value;
        var memberid = e.target.memberid.value;
        var body = {
          properties: {
            id_insurance: id
          }
        };
        if(planname){
          body.properties.plan_name = planname;
        }
        if(planid){
          body.properties.plan_id = planid;
        }
        if(groupid){
          body.properties.group_id = groupid;
        }
        if(memberid){
          body.properties.rx_bin = memberid;
        }
        return body;
      },
// PHARMACY ---------------------------------------------------------------------------------
      addPharm: (e) => {
        e.preventDefault();
        return {
          properties: {
            business_name: e.target.pharmacy.value,
            address: e.target.address.value,
            phone: e.target.phone.value,
            current: e.target.current.checked
          }
        };
      },
      editPharm: (id, e) => {
        e.preventDefault();
        var body = {
          properties: {
            id_pharmacy: id,
            current: e.target.current.checked
          }
        };
        if(e.target.name.value){
          body.properties.business_name = e.target.name.value;
        }
        if(e.target.address.value){
          body.properties.address = e.target.address.value;
        }
        if(e.target.phone.value){
          body.properties.phone = e.target.phone.value;
        }
        return body;
      },
// FAMILY HISTORY CONDITION ------------------------------------------------------------------
      addFamCond: (e) => {
        e.preventDefault();
        var member = {
          properties:{name: e.target.member.value}
        };
        var condition = e.target.condition.value;
        return famAction.AddMember(member)
          .then((id) => {
            var body = {
              properties: {
               condition: condition,
               id_familymember: id
              }
            };
            return body;
          })
      },
// APPOINTMENTS ---------------------------------------------------------------------------------
      addAppointment: (date, time) => {
        return {
          properties: {
            date: date,
            time: time
          }
        };
      }
};