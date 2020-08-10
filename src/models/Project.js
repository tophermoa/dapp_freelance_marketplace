const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types;

const ProjectSchema = new Schema({
	judul:{
		type: String,
		required: true
	},
	deskripsi:{
		type: String,
		required: true
	},
	estimasi:{
		type: String,
		required: true
	},
	budget:{
		type: Number,
		required: true
	},
	kategori:{
		type: String,
		required: true
	},
	level:{
		type: String,
		required: true
	},
	//commentsproject tadinya [{}]
	//kalo pake kurung siku (array) jadi ada id sendiri per commentnya
	commentsproject: [{
		initext: String,
		postedBy:{type:ObjectId, ref:"users"}
	}],
	penawaranproject:[{
		idtawar: String,
		owner: String,
		postedBy:{type:ObjectId, ref:"users"}
	}],
	postedBy: {
		type: ObjectId,
		ref: "users"
	}

})

//nama collection dbnya disini
module.exports = Project = mongoose.model('projectsec', ProjectSchema)