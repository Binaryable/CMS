const fs = require('fs');

const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const HttpError = require('../models/HttpError');
const Post = require('../models/Post');
const User = require('../models/User');

exports.getAllPosts = async (req, res, next) => {
	const currentPage = req.query.page || 1;
	const perPage = req.query.limit || 4;
	let posts;

	try {
		posts = await Post.find()
			.skip((currentPage - 1) * perPage)
			.limit(perPage);
	} catch (err) {
		return next(
			new HttpError('Fetching posts failed, please try again later', 500)
		);
	}

	res.status(200).json({
		message: `find all posts successfully`,
		count: posts.length,
		posts: posts.map(p => p.toObject({ getters: true })),
	});
};

exports.getPostById = async (req, res, next) => {
	const postId = req.params.pid;

	let post;

	try {
		post = await Post.findById(postId);

		if (!post) {
			return next(
				new HttpError(
					`Could not find a post for the provided id ${postId}..`,
					404
				)
			);
		}
	} catch (err) {
		return next(
			new HttpError('Something went wrong, could not find a post', 500)
		);
	}

	res.status(200).json({
		message: `find successfully post with id ${postId}`,
		post: post.toObject({ getters: true }),
	});
};

exports.getPostsByUserId = async (req, res, next) => {
	const userId = req.params.uid;

	let posts;

	try {
		posts = await Post.find({ creator: userId });
	} catch (err) {
		return next(new HttpError('Fetching posts faild, please try again', 500));
	}

	if (!posts || posts.length === 0) {
		return next(
			new HttpError(
				`Could not find a post for the provided user id ${userId}..`,
				404
			)
		);
	}

	res.status(200).json({
		message: `find successfully post with id ${userId}`,
		posts: posts.map(p => p.toObject({ getters: true })),
	});
};

exports.createPost = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		// let errMsg;

		// errors.array().forEach(err => {
		// 	errMsg = err.msg;
		// 	// console.log(err.msg);
		// });

		return next(
			new HttpError(`Invalid inputs passed, please check your data`, 422)
		);

		// return res.status(422).json({ errors: errors.array() });
	}

	const { title, description, creator } = req.body;

	const createdPost = new Post({
		title,
		description,
		imageUrl: req.file.path,
		creator,
	});

	let user;

	try {
		user = await User.findById(creator);

		if (!user) {
			return next(
				new HttpError(
					`Could not find user for the provided id. ${creator}`,
					404
				)
			);
		}
	} catch (err) {
		return next(new HttpError('Creating post failed, try again later', 500));
	}

	try {
		const session = await mongoose.startSession();
		session.startTransaction();
		await createdPost.save({ session: session });
		user.posts.push(createdPost);
		await user.save({ session: session });
		await session.commitTransaction();
	} catch (err) {
		const error = new HttpError('Creating post faild, please try again', 500);
		return next(error);
	}

	res
		.status(201)
		.json({ message: 'post created successfully', post: createdPost });
};

exports.updatePostById = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		next(new HttpError('Invalid inputs passed, please check your data', 422));
		// return res.status(400).json({ errors: errors.array() });
	}

	const postId = req.params.pid;

	let updatedPost;

	try {
		updatedPost = await Post.findById(postId);

		if (!updatedPost) {
			return next(
				new HttpError(
					`Could not find any posts with the provided id ${postId}`,
					404
				)
			);
		}
	} catch (err) {
		return next(
			new HttpError('Someting went wrong, could not update post', 500)
		);
	}

	if (updatedPost.creator.toString() !== req.userData.userId) {
		return next(
			new HttpError(
				'You are not allowed to update this post No valid token, authorization is denied',
				403
			)
		);
	}

	updatedPost.title = req.body.title;
	updatedPost.description = req.body.description;

	try {
		updatedPost.save();
	} catch (err) {
		return next(
			new HttpError('Someting went wrong, could not update post', 500)
		);
	}

	res.status(200).json({
		message: 'Post updated successfully',
		post: updatedPost,
	});
};

exports.deletePostById = async (req, res, next) => {
	const postId = req.params.pid;

	let post;

	try {
		post = await Post.findById(postId).populate('creator');

		console.log(post);

		if (!post) {
			return next(
				new HttpError(
					`Could not find a post for the provided id ${postId}..`,
					404
				)
			);
		}
	} catch (err) {
		return next(
			new HttpError('Someting went wrong, could not delete post', 500)
		);
	}

	if (post.creator.id !== req.userData.userId) {
		return next(
			new HttpError(
				'You are not allowed to delete this post No valid token, authorization is denied',
				403
			)
		);
	}

	const imagePath = post.image;

	try {
		const session = await mongoose.startSession();
		session.startTransaction();
		await post.remove({ session: session });
		post.creator.posts.pull(post);
		await post.creator.save({ session: session });
		await session.commitTransaction();
	} catch (err) {
		return next(
			new HttpError('Someting went wrong, could not delete post', 500)
		);
	}

	fs.unlink(imagePath, err => console.log(err));

	res.status(200).json({
		message: 'post deleted successfully',
		post: post,
	});
};
