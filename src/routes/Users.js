const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/User')
users.use(cors())

process.env.SECRET_KEY = 'secret'

var secretKey = process.env.SECRET_KEY;

users.post('/register', (req, res) => {
	const today = new Date()
	const userData = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: req.body.password,
		created: today
	}

	User.findOne({
		email: req.body.email
	})
	.then(user => {
		if(!user){
			bcrypt.hash(req.body.password, 10, (err, hash) => {
				userData.password = hash
				User.create(userData)
				.then(user => {
					res.json({status: user.email + ' berhasil registrasi!'})
				})
				.catch(err => {
					res.json({error: 'email required harus' })
				})
			})
		} else {
			res.json({errorjuga: 'Usernya sudah ada (already exists)'})
		}
	})
	.catch(err => {
		res.send('error: ' + err)
	})
})

users.post('/login', (req, res) => {
	User.findOne({
		email: req.body.email
	})
	.then(user => {
		if(user){
			//kalo password match
			if(bcrypt.compareSync(req.body.password, user.password)){
				const datanya ={
					_id: user._id,
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email
				}
				let token = jwt.sign(datanya, secretKey, {
					expiresIn: 1440
				})
				// const papa = user._id
				// const {_id,firstName,lastName,email} = user
				//res.json({user:{_id: datanya._id, firstName: datanya.firstName, lastName: datanya.lastName, email: datanya.email}})
				res.send(token)
				//console.log(papa)
			} else {
			//kalo password ga match
				res.json({errortidakdaftar: "User tidak terdaftar"})
			}
		} else {
			res.json({errorbelumngisi: "User belum mengisi"})
		}
	})
	.catch(err => {
		res.send('error : ' + err)
	})
})

//OTENKTIKASI masukannya
//kalo back terus login akun lain bisa jika email dan password benar, jika salah maka eror validasi (benar)
//kalo gapake otorisasi dibawah, back terus login akun lain bisa jika email dan password benar, jika salah tetap bisa (error)  
users.get('/profile', (req, res) => {
	
	var decoded = jwt.verify(req.headers['authorizationz'], process.env.SECRET_KEY)

	User.findOne({
		_id: decoded._id
	})
	.then(user => {
		if(user){
			res.json(user)
		} else {
			res.send('User tidak ada')
		}
	})
	.catch(err => {
		res.send('error : ' + err)
	})
})

module.exports = users