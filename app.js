//requiring express, also must download in the command line
const express = require('express');
//requiring bodyParser, which extracts the entire body portion of an 
//incoming request stream and exposes it on the req.body
const bodyParser = require('body-parser');
//requring es6, a template engine with its only rules for synatx
//scans files in working dir and reads contents of files in template strings
const es6Renderer = require('express-es6-template-engine');
//creating a variable for express called app
const app = express();
//connecting our bodyParser, to json.
//json is an open standard file format, that uses human readable text 
//to store and transmit data objects. values pairs and array data types.
app.use(bodyParser.json());
//use turning bodyParser off?
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('html', es6Renderer); // use es6renderer for html view templates
app.set('views', 'templates'); // look in the 'templates' folder for view templates
app.set('view engine', 'html'); // set the view engine to use the 'html' views
//make this files accessible always
app.use(express.static('./public'));
//creating my little object array that will be used as an API
//an API is a computing interface that defines interactions between
//multiple software intermediaries.
let todoList = [
  {
    id: 1,
    todo: 'Implement a REST API',
  },
];


// homepage route, expecting request, making plan for response
app.get('/', (req, res) => {
  //setting variable to name for the the requested name, otherwise print "world"
  const name = req.query.name || 'World';
  //render or display this to the screen on home page
  res.render('home', {
    //locals used, name as req.name and title as Home
    locals: {
      name: name,
      title: 'Home'
    },
    //also, include my partials which can be found here...
    partials: {
      head: 'partials/head'
    }
  });
})

// GET request to the /todos route
app.get('/todos', (req, res) => {
// use the templates/todos.html file
  res.render('todos', { 

    locals: {
      todos: todoList, // make the 'data' variable available to the template as 'todos'
      title: 'Todos', // pass the 'Friends' string as 'title'
      message: null
    },
    //include my partials which can be found on this path.
    partials: {
      head: 'partials/head'
    }
  })
})
//app post will make updates on todos page.
//expecting request, making plan for response
app.post('/todos', (req, res) => {
  //in the event the request body or request todo is left blank
  if (!req.body || !req.body.todo) {
    //give the user an error
    res.status(400).render('todos', { // use the templates/todos.html file
      
      locals: {
        todos: todoList, // make the 'data' variable available to the template as 'todos'
        title: 'Todos', // pass the 'Friends' string as 'title'
        //message incase they leave the text field incomplete
        message: 'Please Enter Todo Text'
      },
      //include my partials, here is the path to them.
      partials: {
        head: 'partials/head'
      }
    })
    return;
  }
  //defining variable for previousID, from todolist,
  //use the reduce() method that is used to reduce the array to a single value
  //and excutes the provided function for each value of the array.
  //setting two parameters, previous and current
  const prevId = todoList.reduce((prev, curr) => {
    //using tenary method
    // return previous if current id is greater than previous id or current id
    return prev > curr.id ? prev : curr.id;
  }, 0);
  //setting new variable for new TODO list
  const newTodo = {
    //id is equal to previous ID plus one
    id: prevId + 1,
    //todo is equal to whatever the request was
    todo: req.body.todo,
  };
  //and whatever the request was, append it to the todoList.
  todoList.push(newTodo);
  //give a 201 status, which is successful
  res.status(201).render('todos', { // use the templates/todos.html file
    locals: {
      //todos will give todolist
      todos: todoList, // make the 'data' variable available to the template as 'todos'
      //title of page will remain todos
      title: 'Todos', // pass the 'Friends' string as 'title'
      //and the message new todo added will appear once one is added
      message: 'New Todo Added'
    },
    //include my partials, here is their path
    partials: {
      head: 'partials/head'
    }
  })
})

// GET /api/todos
//get or create, api/todos page, 
//expecting requesting, planning for response
app.get('/api/todos', (req, res) => {
  //the response will be adding the todolist to json
  res.json(todoList);
});

// GET /api/todos/:id
//get or create the api/todos/:id page
//anticipating request, planning our response
app.get('/api/todos/:id', (req, res) => {
  //setting variable of todo
  const todo =
  //todolist with find method, which is The find() method returns the value of the first element in an array that pass a test 
    todoList.find((todo) => {
      //once found return the todo.id that is equal to the number in the requested id
      return todo.id === Number.parseInt(req.params.id);
      //or an empty object?
    }) || {};
    //The Object.keys() method returns an array of a given object's 
    //own enumerable property names, iterated in the same order that a normal loop would.
  const status = Object.keys(todo).length ? 200 : 404;
  //response with current status and append to json in todo
  res.status(status).json(todo);
});

// POST /api/todos, expecting request, planning for response
app.post('/api/todos', (req, res) => {
  //if requested body or requested todo is blank..
  if (!req.body || !req.body.todo) {
    //set the status to error code 400 in json
    res.status(400).json({
      //also give this error messsage
      error: 'Provide todo text',
    });
    return;
  }
  const prevId = todoList.reduce((prev, curr) => {
    return prev > curr.id ? prev : curr.id;
  }, 0);
  const newTodo = {
    id: prevId + 1,
    todo: req.body.todo,
  };
  todoList.push(newTodo);
  res.json(newTodo);
});

// PUT /api/todos/:id
app.put('/api/todos/:id', (req, res) => {
  if (!req.body || !req.body.todo) {
    res.status(400).json({
      error: 'Provide todo text',
    });
    return;
  }
  let updatedTodo = {};
  todoList.forEach((todo) => {
    if (todo.id === Number.parseInt(req.params.id)) {
      todo.todo = req.body.todo;
      updatedTodo = todo;
    }
  });
  const status = Object.keys(updatedTodo).length ? 200 : 404;
  res.status(status).json(updatedTodo);
});

// DELETE /api/todos/:id
app.delete('/api/todos/:id', (req, res) => {
  let found = false;
  todoList = todoList.filter((todo) => {
    if (todo.id === Number.parseInt(req.params.id)) {
      found = true;
      return false;
    }
    return true;
  });
  const status = found ? 200 : 404;
  res.status(status).json(todoList);
});

app.listen(3000, function () {
  console.log('Todo List API is now listening on port 3000...');
});