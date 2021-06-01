//Form POST Data
var express = require('express');
var bodyParser =  require('body-parser');
var app = express();
const { check, validationResult } = require('express-validator');

//Set Templating Engine
app.set ('view engine', 'ejs');

// Stylesheets and assets routing
app.use ('/assets', express.static('assets'));
app.use ('/css', express.static('css'));

app.get('/', function (req, res) {
  res.render('register');
});

// create application/json parser
//var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//Fetch post data from server
app.get('/register', function(req, res) {
res.render('register', {qs: req.query});
});

// POST /register gets urlencoded bodies
app.post('/register', urlencodedParser, function(req, res) {
// JSON pair value POST Data result
console.log(req.body);

// Confirmation after successful submission
res.render('register-success', {data: req.body});
});


// Form Validation
app.post('/register', urlencodedParser, [
	check('firstname', 'The first name must not be blank'),
	check('lasttname', 'The last name must not be blank')
		.exists()
		.isLength({ min: 3}),		
	check('email', 'Email is not valid')
		.isEmail()
		.normalizeEmail()	
	
], (req, res) => {
	const errors = validationResul(req)
	if(!error.isEmpty()) {	
		const alert = errors.array();		
		res.render('register', {
			alert			
		})
			
	}
})


app.listen(3000);
console.log('Listeneing to port 3000');