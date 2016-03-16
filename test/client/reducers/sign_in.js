// require(TEST_HELPER)
// const SigninReducer = require(__client + '/reducers/SignIn');
// const stateAction = require(__client + '/actionCreators/stateActions');

// describe('Calling Sign in reducer initially', function(){
// 	it('Should return the correct intial state properties', function(){
// 		expect(SigninReducer().logged).to.equal(false)
// 	})

// 	it('Should return the correct initial state email property', function(){
// 		expect(SigninReducer().token).to.equal(null)
// 	})
// })

// describe("Calling Sign in with action type: 'SIGNINSUCCESS'", function(){
// 	var testToken = 12345
// 	var testAction = stateAction.SignInSuccess(testInfo);
	
// 	it('Should return the correct state logged property', function(){
// 		expect(SigninReducer({}, testAction).logged).to.equal(true)
// 	})

// 	it('Should return the correct state token property', function(){
// 		expect(SigninReducer({}, testAction).token).to.equal(testToken)
// 	})
// })

// describe("Calling Sign in with action type: 'SIGNINFAIL'", function(){
// 	var testAction = { type: 'SIGNINFAIL' };
	
// 	it('Should return the correct updated state logged property', function(){
// 		expect(SigninReducer({}, testAction).logged).to.equal(false)
// 	})

// 	it('Should return the correct updated state token property', function(){
// 		expect(SigninReducer({}, testAction).token).to.equal(null)
// 	})
// })