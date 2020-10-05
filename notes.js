//step1:download: npm i express-es6-template-engine
//step2: then set up requirements: const es6Renderer = require('express-es6-template-engine');
//step 3:created tempelate folder
//step 4:create path way and use 
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');
//step5: add a html to your templates folder
//step6: add link to your friends page on your html, we want that page to render when we go to home page
//step7: use your home page request
app.get('/', (req, res) => {
    //: get name from query parameters
    const name = req.query.name || "world";
    //the string we put in is its path, in what folder is it in. it will be name of your html file.
    res.render('home');
})
//step 8: make sure the path you put in is correct.
//step 9: