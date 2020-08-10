var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var mongoose=require('mongoose');
const jwt = require('jsonwebtoken');
//var port=process.env.PORT || 8080;
var User = require('./src/models/User');

process.env.SECRET_KEY = 'secret'

var secretKey = process.env.SECRET_KEY;

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

const mongoURI = 'mongodb://localhost:27017/mernloginreg'

mongoose
  .connect(mongoURI, {useNewUrlParser: true})
  .then(() => console.log("Terkonek ke MongoDB"))
  .catch(err=>console.log(err))

var Users = require('./src/routes/Users');
var Comments = require('./src/routes/Comments');
var Projects = require('./src/routes/Projects');
var Tasks = require('./src/routes/Tasks');

//path routing paling pertama
app.use('/users', Users)
//private route
app.use('/projectsec', validateUser, Projects)
app.use('/commentsec', validateUser, Comments)
app.use('/task', Tasks)

function validateUser(req, res, next){
	jwt.verify(req.headers['authorizationt'], secretKey, function(err, payload) {
    if (err) {
      res.json({status:"error", message: err.message, data:null});
      console.log('error nih (validateUser)')
    }else{
      // add user id to request
      console.log('berhasil nih (validateUser)')
      const {_id} = payload
      User.findById(_id).then(userdata => {
      	req.user = userdata
      	next();
      })
      //req.body.userId = decoded.id;
      //console.log(req.body.userId)
      
    }
  });
}

// handle 404 error
app.use(function(req, res, next) {
 let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle errors
app.use(function(err, req, res, next) {
 console.log(err);
 
  if(err.status === 404)
   res.status(404).json({message: "Not found"});
  else 
    res.status(500).json({message: "Something looks wrong :( !!!"});
});

// app.get('/', function(req, res){
//     res.sendFile(__dirname+'/src/index.html'); // change the path to your index.html
// });

app.listen(8080, () => {
  console.log("Server is running on port : 8080")
})