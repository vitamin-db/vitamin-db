// successful log-in
function SignInSuccess(token) {
	return {
		type: 'SIGNINSUCCESS',
		token: token
	};
};

// failed log-in
function SignInFail() {
	return {
		type: 'SIGNINFAIL'
	};
};

function SignOut () {
	document.cookie = "token=; expires=Thu, 01 Jan 1600 00:00:00 UTC";
	return {
		type: 'SUPERLOGOUT'
	};
};
// add a doctor to my doctor list state
function AddDoc (doctor, portrait) { // doctor will be an object, i believe
	return {
		type: 'ADDDOCTOR',
		doctor: {...doctor, portrait: portrait}
	};
};

function RemoveDoc (id) {
	return {
		type: 'REMOVEDOCTOR',
		id: id
	};
};

function ChangeInfo (newInfo) {
	return {
		type: 'CHANGEINFO',
		newInfo: newInfo
	}
}

function ChangeDoc (newDoc) {
	return {
		type: 'CHANGEDOC',
		newDoc: newDoc
	}
}

// this is for populating the doctor search api
function SetDocApi (list) {
	return {
		type: 'SETDOCAPI',
		list: list
	};
};

// this clears the doctor api list
function ClearDocApi () {
	return {
		type: 'CLEARDOCAPI'
	};
};

function SetMyInfo (info) {
	return {
		type: 'SETMYINFO',
		list: info
	};
};

function RemoveEye (id) {
	return {
		type: 'REMOVEEYE',
		id: id
	};
};

function AddEye (eye) {
	return {
		type: 'ADDEYE',
		eyerx: eye
	};
};

function GetAllergy (list) {
	return {
		type: 'GETALLERGY',
		list: list
	};
};

function AddAllergy (allergy) {
	return {
		type: 'ADDALLERGY',
		allergy: allergy
	};
};

function RemoveAllergy (id) {
	return {
		type: 'REMOVEALLERGY',
		id: id
	};
};

function AddIns (ins) {
	return {
		type: 'ADDINS',
		ins: ins
	};
};

function RemoveIns (id) {
	return {
		type: 'REMOVEINS',
		id: id
	};
};

function AddPharm (pharm) {
	return {
		type: 'ADDPHARM',
		pharm: pharm
	};
};

function RemovePharm (id) {
	return {
		type: 'REMOVEPHARM',
		id: id
	};
};

function EditPharm (newInfo) {
	return {
		type: 'EDITPHARM',
		info: newInfo
	};
};

function AddAppointment (appointment) {
	console.log("add appoint called");
	return {
		type: 'ADDAPPOINTMENT',
		appointment: appointment
	};
};

function RemoveAppointment (id_appointment) {
	return {
		type: 'REMOVEAPPOINTMENT',
		id_appointment: id_appointment
	};
};

function InvalidSignIn (msg) {
	return {
		type: 'INVALIDSIGNIN',
		msg: msg
	};
};

function InvalidSignUp (msg) {
	return {
		type: 'INVALIDSIGNUP',
		msg: msg
	};
};

function AddFamCond (fam) {
	return {
		type: 'ADDFAMCOND',
		fam: fam
	};
};

function RemoveFamCond (id) {
	return {
		type: 'REMOVEFAMCOND',
		id: id
	};
};

function ChangeInsurance (newIns) {
	return {
		type: 'CHANGEINSURANCE',
		info: newIns
	};
};

function AddImmun (immun) {
	return {
		type: 'ADDIMMUN',
		immun: immun
	};
};

function RemoveImmun (id) {
	return {
		type: 'REMOVEIMMUN',
		id: id
	};
};


module.exports = {
	SignInSuccess,
	SignInFail,
	SignOut,
	AddDoc,
	SetDocApi,
	ClearDocApi,
	SetMyInfo,
	RemoveDoc,
	RemoveEye,
	AddEye,
	GetAllergy,
	AddAllergy,
	RemoveAllergy,
	ChangeInfo,
	ChangeDoc,
	AddIns,
	RemoveIns,
	AddPharm,
	RemovePharm,
	AddAppointment,
	RemoveAppointment,
	InvalidSignIn,
	InvalidSignUp,
	AddFamCond,
	RemoveFamCond,
	ChangeInsurance,
	EditPharm,
	AddImmun,
	RemoveImmun
};