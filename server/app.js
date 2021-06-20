// Load env vars
require('dotenv').config({ path: './config/.env' });

const fs = require('fs');
const path = require('path');

require('colors');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./db/db');
const HttpError = require('./models/HttpError');

// Connect to database
connectDB();

const app = express();

// body parser middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Serving statics images
app.use('/uploads/images', express.static(path.join('uploads', 'images')));

// Dev Logging Middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// import routes files
const postsRoutes = require('./routes/postsRoutes');
const usersRoutes = require('./routes/usersRoutes');

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, OPTIONS'
	);
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});

// excute routes
app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);

app.use((req, res, next) => {
	const error = new HttpError('Could not found this route', 404);
	throw error;
});

app.use((error, req, res, next) => {
	if (req.file) {
		fs.unlink(req.file.path, err => {
			console.log(err);
		});
	}
	if (res.headerSent) {
		return next(error);
	}
	res.status(error.code || 500).json({
		message: error.message || 'An unknown error occured! Server Error',
	});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}...`.yellow.bold);
	console.log(`API : http://localhost.com:${PORT}`.blue.bold);

});