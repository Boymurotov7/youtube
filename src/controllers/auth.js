const { sign } = require('../utils/jwt.js')
const sha256 = require('sha256')
const path = require('path')
const fs = require('fs')

const LOGIN = (req, res, next) => {
	try{
		const { username, password } = req.body
		if(!username || !password) throw new Error('username and password are required!')

		const users = req.select('users')
		const user = users.find(user => user.username == username && user.password == sha256(password))

		if(!user) throw new Error('Wrong username or password!')
		delete user.password
		return res.status(200).json({
			user,
			message: "The user successfully logged in!",
			token: sign({ userId: user.userId, agent: req.headers['user-agent']})
		})	
	} catch(error) {
		return next(error)
	}
}

const REGISTER = (req, res, next) => {
	try{
		const { username, password } = req.body
		const users = req.select('users')
		const found = users.find(user => user.username == username )

		if(found) throw new Error('The user already exists!')
		if(!req.file) throw new Error("The file argument is required!")

		const { size, mimetype, buffer, originalname} = req.file
		if(size > (10 * 1024 * 1024)) {
			throw new Error("The file larger than 10MB!")
		}

		if(!['image/png', 'image/jpeg', 'image/jpg'].includes(mimetype)) {
			throw new Error("The file must be jpg or png!")
		}

		const fileName = Date.now() + originalname.replace(/\s/g, '')
		const pathName = path.join(process.cwd(),'files','images',fileName)
		fs.writeFileSync(pathName,buffer)

		const newUser = {
			userId: users.lenght ? users[users.lenght - 1].userId + 1 : 1,
			username,
			profileImg: '/images' + fileName,
			password: sha256(password),
			userCreatedAt: Date()
		}

		users.push(newUser)
		req.insert('users',users)



		delete newUser.password
		return res.status(201).json({
			user: newUser,
			message: "The user successfully logged in!",
			token: sign({ userId: user.userId, agent: req.headers['user-agent']})
		})	
	} catch(error) {
		return next(error)
	}
}



module.exports = {
	LOGIN,
	REGISTER,
}