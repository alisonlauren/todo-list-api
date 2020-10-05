const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
//requireing the es6 that i just downloaded
const es6Renderer = require('express-es6-template-engine');
const { homedir } = require('os');



const hostname = '127.0.0.1'; // localhost (our computer)
const port = 3000; // port to run server on

const app = express();
const server = http.createServer(app)

//use es6 for html view templates
app.engine('html', es6Renderer);
// setting server settings, change view setting to look in templates
app.set('views', 'templates');
// setting server settings, set view engine to register html
app.set('view engine', 'html');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./public'));

const todoList = [
  {
    id: 1,
    todo: 'Implement a REST API',
    complete: 'false'
  },
  {
    id: 2,
    todo: 'Build a frontend',
    complete: 'false'
  },
  {
    id: 3,
    todo: '???',
    complete: 'false'
  },
  {
    id: 4,
    todo: 'Profit!',
    complete: 'true'
  },
];

app.get('/', (req, res) => {
  const name = req.query.name || "world";
  res.render('home', {
    locals: {
        todoList: todoList,
        title: "Home"
    }, 
    partials: {
        head: 'partials/head'
    }
});
})




// GET /api/todos
app.get('/todo', (req,res) => {
  res.render('todo', {
    locals: {
        todo: todoList
    },
    // partials: {
    //     title: "Home"
    // }
})
})
app.get('/api/todoList', (req, res) => {  res.json(todoList)})


// GET /api/todos/:id
app.get('/api/todoList/:id', (req,res)=>{
  const { id } = req.params;

  const todos = todoList.find(element => {
    if(element.id == id){
      return true
    }
    return false
  })
  
  if (!todos) {
    res.status(404).json({msg: 'No ID exist'})
  } else {
    res.json(todos)
  }
})


// POST /api/todos

app.post('/api/todoList', (req,res)=>{
  if(!req.body.todo) {
    res.status(422).json()
    return
  }
  const newToDo = {
    id: req.body.id,
    todo: req.body.todo,
    complete: 'false'
  }
  
  todoList.push(newToDo)
  
  res.status(201).json(newToDo)
})
  
  // PUT /api/todos/:id ---> Update ID, todo and/or complete
  app.put('/api/todoList/:id', (req,res)=>{
    const { id } = req.params;
    // The some() method tests whether at least one element in the array passes the test implemented by the provided function. It returns a Boolean value.
    const found = todoList.find(element => element.id === parseInt(id));
    
    if(found){
      const updTask = req.body;
      todoList.forEach(element => {
        if(element.id === parseInt(id)){
          // The conditional (ternary) operator is the only JavaScript operator that takes three operands: a condition followed by a question mark (?), then an expression to execute if the condition is truthy followed by a colon (:), and finally the expression to execute if the condition is falsy
          element.id = updTask.id ? updTask.id : element.id;
          element.todo = updTask.todo ? updTask.todo : element.todo;
          element.complete = updTask.complete ? updTask.complete : element.complete;
          res.json({msg: 'Task updated'})
        }
      })
    } else {
      res.status(400).json({msg: `No task with the id of ${id}`})
    }
  })



// DELETE /api/todos/:id
app.delete('/api/todoList/:id', (req,res)=>{
  const { id } = req.params;
  const found = todoList.some(element => element.id === parseInt(id));

  if(found){
    // The filter() method creates a new array with all elements that pass the test implemented by the provided function.
    res.json(todoList.filter(element => element.id === parseInt(id)))
  } else {
    res.status(400).json()
  }

})


server.listen(port, hostname, () => {
  // once server is listening, log to the console to say so
  console.log(`Server running at http://${hostname}:${port}/`);
});
