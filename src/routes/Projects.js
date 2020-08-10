const express = require('express')
const projects = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')

const Project = require('../models/Project')
projects.use(cors())

process.env.SECRET_KEY = 'secret'

//buat project
projects.post("/project", (req, res, next) => {
	Project.create({
		judul: req.body.judul,
		deskripsi: req.body.deskripsi,
		estimasi: req.body.estimasi,
		budget: req.body.budget,
		kategori: req.body.kategori,
		level: req.body.level,
		postedBy: req.user
	}, (err, result) => {
		if(err){
			next(err);
		} else {
			res.json({status: "success", message: "project berhasil ditambah", data: result})
		}
	})
	req.user.password = undefined;
	console.log(req.user)
	//res.send("ok")
})

//tampil semua project
projects.get("/project", (req, res, next) => {
	Project.find({}, function(err, projects){
		var data = []
		if(err){
			next(err);
		} else {
			for (let pro of projects){
				data.push([pro.judul, pro.deskripsi,pro.estimasi,pro.budget,pro.kategori,pro.level]);
			}
		}
		//res.send(data);
	})
	.populate("postedBy", "_id firstName")
	.populate("commentsproject.postedBy", "_id firstName")		//BARUUU tampilin komentar sesuai projectnya
	.then(data=>{
		res.send(data)
	})
})

//tampil myproject
projects.get('/myproject', (req, res) => {
	Project.find({postedBy: req.user._id})
	.populate("postedBy", "_id firstName")
	.then((data) => {
		res.send(data)
		res.json({data: data})
	})
	.catch(err=>{
		console.log(err)
	})
})

//buat comment 1111111111111111
// projects.post("/comment", (req, res, next) => {
// 	Comment.create({
// 		text: req.body.text,
// 		postedBy: req.user._id
// 	}, (err, result) => {
// 		if(err){
// 			next(err);
// 		} else {
// 			res.json({ status: "success", message: "komentar berhasil ditambahkan", data: null})
// 		}
// 	})
// })

//buat comment 222222222222222
projects.put("/comment", (req, res) => {
	const comment = {
		initext: req.body.initext,
		postedBy: req.user._id
	}
	Project.findByIdAndUpdate(req.body.projectId, {
		$push:{commentsproject:comment}
	}, {
		new: true
	})
	.populate("commentsproject.postedBy", "_id firstName")
	.populate("postedBy","_id firstName")
	.exec((err,result)=>{
		if(err){
			return res.status(422).json({error:err})
			console.log(commentsproject)
			console.log(err)
		} else {
			res.json(result)
			console.log(result)
		}
	})	
})

//buat nyimpen id Penawaran dari Smart Contract
projects.put("/penawaran", (req, res) => {
	const penawaran = {
		idtawar: req.body.idtawar,
		owner: req.body.owner,
		postedBy: req.user._id
	}
	Project.findByIdAndUpdate(req.body.projectId, {
		$push:{penawaranproject:penawaran}
	}, {
		new: true
	})
	.populate("penawaranproject.postedBy", "_id firstName")
	.populate("postedBy","_id firstName")
	.exec((err,result)=>{
		if(err){
			return res.status(422).json({error:err})
			console.log(penawaranproject)
			console.log(err)
		} else {
			res.json(result)
			console.log(result)
		}
	})	
})



//getAll comment(get semua comment di project)
projects.get("/comment", (req, res, next) => {
	//var commentList = [];
	//const siid = commentsproject._id;
	//console.log(commentsproject[0]);
	// Project.findById({$get:{commentsproject: initext}})
	// .populate("commentsproject.postedBy", "_id firstName")
	// .then((result) => {
	// 	res.json({data: result})
	// })
	// .catch(err=>{
	// 	console.log(err)
	// })





	Project.find({}, function(err, comments){
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
    			data.push({id: com.commentsproject._id, initext: com.commentsproject.initext, postedBy: com.commentsproject.postedBy});
    			//data.push({semua: com.commentsproject});
    			//data.push([com.commentsproject]);
    		}
    //res.json({status:"success", message: "Komentar list ditemukan!!!", data:{commentsproject: data}, comcom: data});   
   }
   res.send(data);
}).populate("commentsproject.postedBy", "_id firstName");
}) 

module.exports = projects