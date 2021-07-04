import express from 'express';
import routes from './src/routes/routes.js';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import JsonWebToken from 'jsonwebtoken';
import cors from 'cors';

const app = express();

const PORT = 5000;

const allowedOrigins = ['http://localhost:3000'];
const corsOptions = {
	origin: allowedOrigins,
	optionsSuccessStatus: 200
}
app.use(cors(corsOptions));


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/cooktopiaDB', {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


//JWT setup
app.use((req, res, next) => {
	if (req.headers && req.headers.authorization &&
		req.headers.authorization.split(' ')[0] == 'JWT') {
		JsonWebToken.verify(req.headers.authorization.split(' ')[1], 'COOKTOPIA_APIs',
			(err, decode) => {
				if (err) {
					req.user = undefined;
				}
				req.user = decode;
				next();
			})
	}
	else {
		req.user = undefined;
		next();
	}
})

routes(app);

app.get('/', (req, res) => {
	res.send('node and express server is running on port ' + PORT)
});

app.listen(PORT, () => {
	console.log('your server is running on port ' + PORT);
})