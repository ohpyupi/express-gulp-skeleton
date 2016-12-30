let express = require('express');
let path = require('path');
let dotenv = require('dotenv');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

// environmental variables
dotenv.load();
const PORT = process.env.PORT || 3000;

// init express
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade')

// middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')))

// API routes
let posts = require('./routes/posts');
let auth = require('./routes/auth');
app.use('/api/posts', posts);
app.use('/api/auth', auth);
app.all('/*', (req, res)=>{// root
	res.render('index');
});

app.listen(PORT, ()=>{
	console.log(`App is running on port ${PORT}`);
});

