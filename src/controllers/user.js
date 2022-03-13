const GET = ( req, res, next) => {
	try{
		const { userId } = req.params
		const { page = req.PAGINATION.page, limit = req.PAGINATION.limit } = req.query

		const users = req.select('users')

		if(userId) {
			const user = users.find(user => user.userId == userId )
			return res.json(user)
		}
		else {
			const paginatedUsers = users.slice(page * limit - limit, limit * page)
			return res.json(paginatedUsers)
		}
	} catch(error){
		return next(error)
	}

} 

module.exports = {
	GET
}