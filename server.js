const express = require('express')
const app = express(); // call express function
var ejsLayouts = require('express-ejs-layouts');

const path = require('path');


const connect = require('./config/dbConnect');
const bodyParser = require('body-parser');

const urls = require('./models/URLs');

const port = 5000; // default port

// conect to database
connect();

// parsing the data // middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/assets', express.static('assets'));
app.use('/css', express.static('css'));
// vien engine 
app.set('view engine', 'ejs');
app.use(ejsLayouts);

//API 
// get put delete post patch

//home route
app.get("/", (req,res) =>{  // we should always mention the route "/" 
   // res.json({msg: "Hello!!"})
   res.render("home" , {host:req.get('host')});
});

app.post("/",async (req, res) => {
    // console.log(`Data: ${req.body.name}`); // json format
    console.log(`Data:`, req.body);
    const {redirectedUrl, name} = req.body; 

    if(redirectedUrl==='' || name === '') {
        return res.render('home', {
        host : req.get('host'),
        error: 'Please fill in all fields!'
        })
    }

    const url = await urls.find({name});

    console.log(url);

    
    

    // check if URL exists already in database
    if(url.length === 1){
        return res.render('home' ,{error:"URL already exists!"});
        
        
    } 
    const fullUrl = 'http://' +  req.get('host') + '/' + name;

        const newURL = new urls({
            redirectedUrl,
            name,
            fullUrl,
        });

         newURL
         .save()
         .then(()=>{res.render('home', {host : req.get('host'),success: fullUrl})})
         .catch(err=>{console.log(err)});

   
})

app.get("/:name", async  (req,res) =>{  // we should always mention the route "/" 
   const {name} = req.params;
    
   const data = await urls.find({name});
   if(data.length < 1){
    return  res
    .status(404)
    .json({error:true, msg: "Error: 404 ! This url is not found!"});
    
   } 

    res.redirect(data[0].redirectedUrl);
 });

app.listen(port,()=>{ //callback function
  console.log(`Server is running on port ${port}`);
});