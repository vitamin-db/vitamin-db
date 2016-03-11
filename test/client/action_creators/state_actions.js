require(TEST_HELPER)
const apiAction = require(__client + '/actionCreators/apiActions');
const stateAction = require(__client + '/actionCreators/stateActions');


// this file will test api actions to make sure the correct action is being returned from async actions

describe('Calling each action creator', function(){
	it('should return the correct type property', function() {

		var testAction1 = stateAction.SignIn();
		var testAction2 = stateAction.SignUpSubmit();

	  	expect(testAction1.type).to.equal('SIGNIN');
	  	expect(testAction2.type).to.equal('SUBMIT');

	})
})