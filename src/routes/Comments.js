const express = require('express')
const comments = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')

const Comment = require('../models/Comment')
comments.use(cors())

process.env.SECRET_KEY = 'secret'

//ini comment normal
//path tujuan paling belakang
// comment.post('/comment', (req, res) => {
// 	const commentData = {
// 		userComment: req.body.userComment
// 	}

// 	Comment.find()
// 	.then(user => {
// 		if(user){
// 				Comment.create(commentData)
// 				.then(user => {
// 					res.json({status: user.userComment + ' berhasil komentar!'})
// 				})
// 				.catch(err => {
// 					res.send('errornya: ' + err)
// 				})
// 		} else {
// 			res.json({error: 'Gagal komentar ada eror'})
// 		}
// 	})
// 	.catch(err => {
// 		res.send('error: ' + err)
// 	})
// })


//ini create
comments.post("/comment", (req, res, next) => {
	Comment.create({
		userComment: req.body.userComment
	}, (err, result) => {
		if(err){
			next(err);
		} else {
			res.json({ status: "success", message: "komentar berhasil ditambahkan", data: null})
		}
	})
})

//ini get semua (getAll)
comments.get("/comment", (req, res, next) => {
	//var commentList = [];
	Comment.find({}, function(err, comments){
		//channel more codes
		// if(err){
		// 	res.send(err)
		// }

		var data = [];
		// Object.keys(comments).forEach((key) => {
		// 	var val = comments[key];
		// 	data.push([val._id, val.userComment]);
		// });

		//medium
   		if (err){
    		next(err);
   		}else{
    		for (let com of comments) {
    			//commentList.push({id: com._id, userComment: com.userComment});
    			data.push([com._id, com.userComment]);
    		}
    //res.json({status:"success", message: "Komentar list ditemukan!!!", data:{comments: commentList}, comcom: commentList});   
   }
   res.send(data);
});
})

//ini getById
comments.get('/comment/:commentId', (req, res, next) => {
	console.log(req.body);
  	Comment.findById(req.params.commentId, function(err, commentInfo){
   		if (err) {
    		next(err);
   		} else {
    		res.json({status:"success", message: "Comment found!!!", data:{comments: commentInfo}});
   		}
  	});
})

// comments.get('/profile', (req, res) => {
	
// 	var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

// 	User.findOne({
// 		_id: decoded._id
// 	})
// 	.then(user => {
// 		if(user){
// 			res.json(user)
// 		} else {
// 			res.send('User tidak ada')
// 		}
// 	})
// 	.catch(err => {
// 		res.send('error : ' + err)
// 	})
// })

module.exports = comments