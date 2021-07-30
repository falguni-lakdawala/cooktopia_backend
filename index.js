import express from 'express';
import routes from './src/routes/routes.js';
import cors from 'cors';
import  mongoose   from 'mongoose';
import  passport from 'passport';
import { passports }from './src/controller/passport.js'; 
import  session from 'express-session';
import  bodyParser from 'body-parser';
import MongoStore  from 'connect-mongo';
import { config } from './src/assets/config.js';

const app = express();

const PORT = 3000;

const allowedOrigins = ['http://localhost:3000', 'http://cooktopia.s3-website-us-west-2.amazonaws.com','http://www.cooktopia.ca.s3-website-us-west-2.amazonaws.com','www.cooktopia.ca'];
const corsOptions = {
	origin: allowedOrigins,
	optionsSuccessStatus: 200
}
app.use(cors(corsOptions));


mongoose.Promise = global.Promise;
mongoose.connect(config.connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})


app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));

passports(passport);
routes(app);


app.use(
    session({
      secret: 'cooktopia',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongoUrl: config.connectionString,
        ttl : 24 * 60 * 60,
        autoRemove : 'native' 
      })
    })
)

app.use(express.urlencoded({extended : true}));

app.get('/', (req, res) => {
	res.send('node and express server is running on port ' + PORT)
});

app.listen(PORT, () => {
	console.log('your server is running on port ' + PORT);
})
