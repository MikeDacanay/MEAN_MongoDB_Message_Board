var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PostSchema = new mongoose.Schema({
	name: {type: String, required: true, minlength: 4},
	message: {type: String, required: true }, 
	comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, 
{timestamps: true}
);
var CommentSchema = new mongoose.Schema({
	name: {type: String, required: true, minlength: 4},
	_post: {type: Schema.Types.ObjectId, ref: 'Post'}, //this shows comment schema belongs to PostSchema
	text: { type: String, required: true },
}, 
{timestamps: true });
mongoose.model('Post', PostSchema);
mongoose.model('Comment', CommentSchema);
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

mongoose.connect('mongodb://localhost/Message_board');
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended: true}));
app.listen(8000, function() {})
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

app.get('/', function(req,res){
	res.render('index');
})

app.post('/addpost', function(req,res){
	var newPost = new Post({name:req.body.name,message:req.body.message})
	newPost.save(function(err){
	   	if(err) {
	    	console.log('something went wrong');
	    } else {
	    	console.log('successfully added a user!');
	    	res.redirect('/');
	    }
	})
})