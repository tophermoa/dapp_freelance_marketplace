const express = require('express');
const router = express.Router();
const mongojs=require('mongojs');
const db = mongojs("mernloginreg",["tasks"]);

router.get("/tasks", (req, res, next) => {
	db.tasks.find({}, {_id: 1, title: 1 }, (err, tasks) => {
		if(err){
			// res.send(err);
			res.json({error: "Ada error"})
		}

		var data=[];
		Object.keys(tasks).forEach((key) => {
			var val = tasks[key];
			data.push([val.title, val._id]);
		});
		// res.send(data);
		res.json(data);
	});
});

router.post("/task", (req, res, next) => {
	var task = req.body;
	if(!task.title){
		res.status(400)
		res.json({
			error: "Bad Data"
		});
	} else {
		db.tasks.save(task, (err, task) => {
			if(err){
				res.send(err);
			}
			res.json(task);
		});
	}
});

module.exports = router;