const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
const mongoose = require('mongoose');
const pass = require(__dirname + '/pass.js');

//Connecting to local database 
mongoose.connect('mongodb+srv://farhan-admin:' + pass.password + '@blogcluster.cofqe.mongodb.net/blogDB');

//Creating a schema for the posts
const postSchema = new mongoose.Schema({
    title: String,
    content: String
  });

const Post = mongoose.model('Post', postSchema);

// const Posts = [];

const homeStartingContent = " This is where you'll see some of my writing works. I'm not a professional, this is more like a hobby for me and I hope you like it!";

const aboutContent = "Hey there! I am Farhan Ansari, an aspiring developer looking to get to grips with the inner workings of the digital world that encapsulates us. This website was created to show off my other forte, which is my hobby of writing and also as part of a challenge to learn databases and other fundamentals of back-end programming.";

const contactContent = "Feel free to get in touch through all my social media handles :)";

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    Post.find({}, function(err, posts) {
        res.render('home', {
            homeContent: homeStartingContent,
            posts: posts
        });
    });
});

app.get('/about', function(req, res){
    res.render('about', {aboutContent: aboutContent});
});

app.get('/contact', function (req, res) {
    res.render('contact', {contactContent: contactContent});
});

app.get('/compose', function (req, res) {
    res.render('compose');
});

app.get('/posts/:postid', function (req, res) {
    const requestedPostId = req.params.postid;

    Post.findOne({_id: requestedPostId}, function(err, post){
        if(!err) {
            res.render("post", {
                postTitle: post.title,
                postContent: post.content
              });
        }
      });

});

app.post('/compose', function (req, res) {
    const post = new Post({
        title: req.body.title,
        content: req.body.post
    });

    post.save();

    res.redirect('/');
});


app.post('/home', function (req, res) {
    res.render('post', )
});


app.listen(3000, function() {
    console.log('listening on port 3000');
});

