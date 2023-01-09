//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { rearg } = require("lodash");
const _ = require("lodash");

const homeStartingContent="A home page is a webpage that serves as the starting point of website. It is the default webpage that loads when you visit a web address that only contains a domain name. For example, visiting https://techterms.com will display the Tech Terms home";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "connect with me :)"
const app = express();

app.set('view engine', 'ejs');

let datas =[];
var posts = []; 

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
//get req for home route
app.get ("/home",function(req,res){
res.render("home", { homeContent:homeStartingContent,posts:posts});
});
//get req for about route

app.get('/about',function(req,res){
res.render("about",{aboutContent:aboutContent});
});

//get req for contact route

app.get("/contact",function(req,res){
res.render("contact",{contactContent:contactContent})
});

//get req for success route
app.get ("/success", function(req,res) {


  res.render("success",{dataofForm : datas})

})

//get req for compose route
app.get("/compose",function(req,res){
  res.render("compose");
});

//post req for compose route to hold data redirect to home route
app.post("/compose",function(req,res){
const post = {
  Title :req.body.postTitle,
  body : req.body.postbody 
}
posts.push(post);
res.redirect("/home");
});

//for tap into dynamic url in all format

app.get("/posts/:postName", function(req,res){
  const requestedTitle =_.lowerCase( req.params.postName);

  posts.forEach(function(post){
  const storedTitle = _.lowerCase(post.Title);
  if (storedTitle===requestedTitle){
    res.render("post",{
      title: post.Title,
      body: post.body

    })
  }
  });


});


//post req for contact route to hold data
app.post ("/contact",function(req,res){
  const data = {

    fname : req.body.firstname,
    lname: req.body.lastname,
    cname : req.body.country,
    subj : req.body.subject


  };  
  datas.push(data);
  res.redirect("/success");
  

});






















app.listen(3000, function() {
  console.log("Server started on port 3000");
});
