const jwt = require('jsonwebtoken')
const { TOKEN_TIME } = require('../../config.js')

module.exports = {
	sign: (payload) => jwt.sign(payload,process.env.TOKEN_KEY,{  expiresIn: TOKEN_TIME}),
	verify: (token) => jwt.verify(token,process.env.TOKEN_KEY)
}