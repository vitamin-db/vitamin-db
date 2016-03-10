const SendR = {}

module.exports = SendR


/*
  Helper function that logs and throws an error
*/
SendR.logErr = function(description, error) {
	console.error('*** ', description, ' ***')
	console.error(error)
	if (error instanceof Error) {throw error}
}


/*
  Sends a JSON data object to the client
*/
SendR.resData = function(res, status, data) {
	res.status(status).json(data)
}


/*
  Sends the file at the location passed in to the clinet
*/
SendR.resAsset = function(filePath) {
	res.sendFile(filePath)
}


/*
  Sends an error status and JSON object describing the problem {msg: 'Helpful text about error'}
  This will be helpful, for example, for explaining why a login failed
*/
SendR.errMsg = function(res, status, description) {
	SendR.resData(res, status, {msg: description})
}


/*
  Deals with an error. 
    If the error is a true instance of an error, this should send both a description and message to the client
    Otherwise, just sends a helpful message
*/
SendR.error = function(res, status, description, error) {
	try {
		SendR.logErr(description, error)

		//if no real error, just something we don't want to happen
		SendR.errMsg(res, status, description)

	} catch(error) {
		//error was thrown
		SendR.resData(res, status, {error: error, msg: description})
	}
}