

window.addEventListener("DOMContentLoaded", function (e) {
  e.preventDefault()
})


function renderTodos(todosArray) {
  const toDoListHTML = todosArray.map((toDoList) => {
    return `
    <li>
    ${toDoList.todo} :${toDoList.complete}
    </li>
    `
  })
  // const todosUl = document.getElementById('friends');
  return toDoListHTML.join('');
}

function getToDo() {
  axios.get('/api/todoList')
    .then((res) => {
      console.log(res.data)
      renderTodos(res.data);
      const todosUl = document.getElementById('friends');
      todosUl.innerHTML = renderTodos(res.data);
    })

}

getToDo();

const form = document.getElementById('todoForm')
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e.target.elements)
  axios.post('/api/todoList', {
    id: e.target.elements.id.value,
    todo: e.target.elements.todo.value,
    complete: e.target.elements.complete.value
  })

    .then(res => {
      if (res.status === 201) {
        getToDo();
      }
    })
  })
