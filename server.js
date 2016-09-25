// set up dependencies
var express = require('express');
var app = express();
var insta = require('instagram-node').instagram();

// CONFIGURE THE APP
// ==================================================
// tell node where to look for site resources
app.use(express.static(__dirname + ('/public')));

// use EJS 
app.set('view engine','ejs');

// configure instagram app with client id
insta.use({
	// get these from when we create our app as an instagram developer
	// https://www.instagram.com/developer/
	client_id: 'CLIENT_ID',
	client_secret: 'CLIENT_SECRET'
});

// SET THE ROUTES
// ===================================================
// home page route - popular images
app.get('/', function(req, res) {

    // use the instagram package to get popular media
    insta.user_self_media_recent(function(err, medias, pagination, remaining, limit)
     {
        // render the home page and pass in the popular images
        res.render('pages/index', { grams: medias });
    });

});

// START THE SERVER
// ==================================================
app.listen(8080);
console.log('App started');
