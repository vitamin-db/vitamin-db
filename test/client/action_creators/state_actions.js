require(TEST_HELPER)
const stateAction = require(__client + '/actionCreators/stateActions');


// this file will test api actions to make sure the correct action is being returned from async actions

describe('Calling all state action: Sign Up Submit', function(){
	it('should return the correct type property', function() {
	  	expect(stateAction.SignUpSubmit().type).to.equal('SUBMIT');
	})
})

describe('Calling all state action: Sign in success', function(){
	it('should return the correct type property', function() {

	  	expect(stateAction.SignUpSubmit().type).to.equal('SUBMIT');
	  	expect(stateAction.SignInSuccess().type).to.equal('SIGNINSUCCESS');
	  	expect(stateAction.SignInFail().type).to.equal('SIGNINFAIL');

	})
})

describe('Calling all state action: Sign in fail', function(){
	it('should return the correct type property', function() {

	  	expect(stateAction.SignUpSubmit().type).to.equal('SUBMIT');
	  	expect(stateAction.SignInSuccess().type).to.equal('SIGNINSUCCESS');
	  	expect(stateAction.SignInFail().type).to.equal('SIGNINFAIL');

	})
})