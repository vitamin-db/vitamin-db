require(TEST_HELPER)
const stateAction = require(__client + '/actionCreators/stateActions');


// this file will test api actions to make sure the correct action is being returned from async actions

describe('Calling state action: Sign Up Submit', function(){
	it('should return the correct action type property', function() {
	  	expect(stateAction.SignUpSubmit().type).to.equal('SUBMIT');
	})

	it('should return the correct action info property', function(){
		var testData = {username: "username", password: "password", email: "email", phone: "phone"};
		expect(stateAction.SignUpSubmit(testData).info).to.equal(testData)
	})
})

describe('Calling state action: Sign in success', function(){
	it('should return the correct action type property', function() {
	  	expect(stateAction.SignInSuccess().type).to.equal('SIGNINSUCCESS');
	})

	it('should return the correct action token property', function(){
		var testToken = "abc123";
		expect(stateAction.SignInSuccess(testToken).token).to.equal(testToken)
	})
})

describe('Calling state action: Sign in fail', function(){
	it('should return the correct action type property', function() {
	  	expect(stateAction.SignInFail().type).to.equal('SIGNINFAIL');
	})
})
