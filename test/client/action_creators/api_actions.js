require(TEST_HELPER)
const apiAction = require(__client + '/actionCreators/apiActions');
const stateAction = require(__client + '/actionCreators/stateActions');

describe('Calling Sign-up API action', function(){
	it('Should return a dispatch function', function(){

		var testBody = {test: "body"};

		var testApi = apiAction.SignUp(testBody)

		expect(testApi).to.be.an('function')

	})
})