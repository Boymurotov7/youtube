require('dotenv').config()

const PORT = process.env.PORT || 3000

const TOKEN_TIME = 60 * 60 * 24

const PAGINATION = {
	page: 1,
	limit: 10
}

module.exports = {
	TOKEN_TIME,
	PAGINATION,
	PORT
}