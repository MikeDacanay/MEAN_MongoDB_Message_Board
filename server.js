var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PostSchema = new mongoose.Schema({
	name: {type: String, required: true, minlength: 4},
	text: {type: String, required: true }, 
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


mongoose.connect('mongodb://localhost/Message_board');
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended: true}));
app.listen(8000, function() {})
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

app.get('/', function(req,res){
	res.render('index');
})