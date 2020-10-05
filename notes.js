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
    res.render('home', {
    //provide options to render engine
    //you can now use ${} in your html file, aka ${name}
    //why render and not send? client side and server side control
    //seperation of concerns, temp is in charge of what displays on page
    locals: {
        name: name,

    }, 
    partials: {
        head: 'partials/head'
    }
});
})
//step 8: make sure the path you put in is correct.
//step 9: What if we want to do a loop? use a forEach.
//step 10: create a new tempelate, friends.html in tempelate folder
//step 11: add a ul in your new html
//<ul>


//</ul>
//Add this code to your .js, this code will render the information on the friends.html
app.friends('/friends2', (res, req) => {
    res.render('friends', {
        locals: {
            friends: data
        }
    })
})

//step 12: go to html page and put in this code in ul tags in body of html
${friends.map(friend => {
    return `<li><a href="/friends/${friend.handle}">${friend.name}<a></li>`
}) .join('')}

//locals make it easier to access on the page
//step 13: Creating a partial, create a folder called partials inside tempelates, and create head.html
//a snippet of html, that will be in every html page
//add code below locals so theres a path way to the partials
//add ${head} to your htmls you want to inheriet from head.html
app.get('/', (req, res) => {
    res.render('home', {
        partials: {
            head: '/partials/head',
            title: ""
        }
    });
});
//parital is having part of your html inherit from another
//in your partial you could having you title print as a title definited in you r.js
//step 14: add your render function in .js
locals: {
    name: name,
    title: "Home"
},
//then you can use ${title} on your head.html
//with head.html you could just use a single styles.css that styles each page
//objective of day to adjusting your homepage to a template file
//todo's page