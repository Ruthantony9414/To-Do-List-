document.addEventListener('DOMContentLoaded', loadTodos);
const addButton = document.getElementById('add-btn');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const filterButtons = document.querySelectorAll('.filter-buttons button');

addButton.addEventListener('click', addTodo);
todoList.addEventListener('click', handleTaskAction);
filterButtons.forEach(button => button.addEventListener('click', filterTodos));

function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText === '') return;

    const li = document.createElement('li');
    li.innerHTML = `
        <span>${todoText}</span>
        <div>
            <button class="complete-btn">✔</button>
            <button class="delete-btn">❌</button>
        </div>
    `;
    todoList.appendChild(li);

    saveLocalTodos(todoText);
    todoInput.value = '';
}

function handleTaskAction(e) {
    const item = e.target;
    if (item.classList.contains('complete-btn')) {
        const todo = item.parentElement.parentElement;
        todo.classList.toggle('completed');
    } else if (item.classList.contains('delete-btn')) {
        const todo = item.parentElement.parentElement;
        removeLocalTodos(todo);
        todo.remove();
    }
}

function filterTodos(e) {
    const filter = e.target.id;
    const todos = todoList.childNodes;
    todos.forEach(todo => {
        switch (filter) {
            case 'filter-completed':
                if (!todo.classList.contains('completed')) todo.style.display = 'none';
                else todo.style.display = 'flex';
                break;
            case 'filter-incomplete':
                if (todo.classList.contains('completed')) todo.style.display = 'none';
                else todo.style.display = 'flex';
                break;
            default:
                todo.style.display = 'flex';
        }
    });
}

function saveLocalTodos(todo) {
    let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    todos.push({ text: todo, completed: false });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${todo.text}</span>
            <div>
                <button class="complete-btn">✔</button>
                <button class="delete-btn">❌</button>
            </div>
        `;
        if (todo.completed) li.classList.add('completed');
        todoList.appendChild(li);
    });
}

function removeLocalTodos(todoElement) {
    let todos = JSON.parse(localStorage.getItem('todos'));
    todos = todos.filter(todo => todo.text !== todoElement.firstChild.textContent);
    localStorage.setItem('todos', JSON.stringify(todos));
}