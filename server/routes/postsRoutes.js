const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

// import controllers
const {
	createPost,
	getAllPosts,
	getPostById,
	updatePostById,
	deletePostById,
	getPostsByUserId,
} = require('../controllers/postsControllers'); // Places Controllers
const fileUpload = require('../middleware/file-upload');
const auth = require('../middleware/auth');

router.get('/', getAllPosts);

router.get('/:pid', getPostById);

router.get('/user/:uid', getPostsByUserId);

router.post(
	'/',
	auth,
	fileUpload.single('imageUrl'),
	[
		body('title', 'Title is required').not().isEmpty().trim(),
		body('description', 'Please enter description min length is 5')
			.isLength({
				min: 5,
			})
			.trim(),
	],
	createPost
);

router.put(
	'/:pid',
	auth,
	[
		body('title', 'Title is required').not().isEmpty().trim(),
		body('description', 'Please enter description min length is 5')
			.isLength({
				min: 5,
			})
			.trim(),
	],
	updatePostById
);

router.delete('/:pid', auth, deletePostById);

module.exports = router;
