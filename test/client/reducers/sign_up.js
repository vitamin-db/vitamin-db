require(TEST_HELPER)
const SignupReducer = require(__client + '/reducers/SignUp');
const stateAction = require(__client + '/actionCreators/stateActions');

describe('Calling Sign up reducer initially', function(){
	it('Should return the correct intial state username property', function(){
		expect(SignupReducer().username).to.equal("username")
	})

	it('Should return the correct initial state email property', function(){
		expect(SignupReducer().email).to.equal("email")
	})

	it('Should return the correct intial state phone property', function(){
		expect(SignupReducer().phone).to.equal("phone")
	})
})

describe("Calling Sign up with action type: 'SUBMIT'", function(){
	var testInfo = { username: "Joellama", email: "asdf@yahoo.com", phone: 123};
	var testAction = stateAction.SignUpSubmit(testInfo);
	
	it('Should return the correct updated state property', function(){
		expect(SignupReducer({}, testAction).username).to.equal("Joellama")
	})

	it('Should return the correct state email property', function(){
		expect(SignupReducer({}, testAction).email).to.equal("asdf@yahoo.com")
	})

	it('Should return the correct state phone property', function(){
		expect(SignupReducer({}, testAction).phone).to.equal(123)
	})
})