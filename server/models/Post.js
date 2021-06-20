const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
	title: {
		type: String,
		required: [true, 'Title is required'],
	},
	description: {
		type: String,
		required: true,
		minlength: [5, 'Please enter description min length is 5'],
	},
	imageUrl: {
		type: String,
		required: true,
	},
	creator: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: 'User',
	},
});

module.exports = mongoose.model('Post', PostSchema);
