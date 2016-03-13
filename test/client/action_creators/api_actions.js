require(TEST_HELPER)
const apiAction = require(__client + '/actionCreators/apiActions');

describe('Calling API action: Sign Up', function(){
	it('Should return a dispatch function', function(){
		expect(apiAction.SignUp()).to.be.an('function')
	})
})

describe('Calling API action: Sign In', function(){
	it('Should return a dispatch function', function(){
		expect(apiAction.SignIn()).to.be.an('function')
	})
})