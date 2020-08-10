const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	userComment:{
		type: String
	}
})

//nama collection dbnya disini
module.exports = Comment = mongoose.model('commentsec', CommentSchema)