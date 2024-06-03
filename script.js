const todoButton = document.querySelector('.input-button');
const todoInput = document.querySelector('.todo-in');
const todoList = document.querySelector('.todo-list');
const completedFilter = document.querySelector('.completed-filter');
const remainigFilter = document.querySelector('.remaining-filter');
const allFilter = document.querySelector('.all-filter');

const init = () => {
  let todolist;
  if (localStorage.getItem('todolist')) {
    todolist = JSON.parse(localStorage.getItem('todolist'));
  } else {
    todolist = [];
  }
  todoList.innerHTML = ``;
  todolist.forEach((todo) => {
    const newTodo = document.createElement('div');
    newTodo.classList.add('todo');

    const newTodoListItem = document.createElement('li');
    newTodoListItem.innerText = todo.text;
    if (todo.completed) {
      newTodoListItem.classList.add('mark-complete');
    }

    const newTodoBtnContainer = document.createElement('div');
    const completeBtn = document.createElement('button');
    completeBtn.classList.add('check-btn');
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('trash-btn');

    completeBtn.innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
    deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;

    newTodoBtnContainer.appendChild(completeBtn);
    newTodoBtnContainer.appendChild(deleteBtn);

    newTodo.appendChild(newTodoListItem);
    newTodo.appendChild(newTodoBtnContainer);

    todoList.appendChild(newTodo);
  });
};

document.addEventListener('DOMContentLoaded', init);

todoButton.addEventListener('click', (e) => {
  e.preventDefault();
  const todotext = todoInput.value;

  if (!todotext) return;

  //save to local storage
  saveTodoListToLocalStorage(todotext);

  const newTodo = document.createElement('div');
  newTodo.classList.add('todo');

  const newTodoListItem = document.createElement('li');
  newTodoListItem.innerText = todotext;

  const newTodoBtnContainer = document.createElement('div');
  const completeBtn = document.createElement('button');
  completeBtn.classList.add('check-btn');
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('trash-btn');

  completeBtn.innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
  deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;

  newTodoBtnContainer.appendChild(completeBtn);
  newTodoBtnContainer.appendChild(deleteBtn);

  newTodo.appendChild(newTodoListItem);
  newTodo.appendChild(newTodoBtnContainer);

  todoList.appendChild(newTodo);

  todoInput.value = '';
});

const saveTodoListToLocalStorage = (todo) => {
  let todolist;
  if (localStorage.getItem('todolist')) {
    todolist = JSON.parse(localStorage.getItem('todolist'));
  } else {
    todolist = [];
  }

  todolist.push({ text: todo, completed: false });
  console.log(todolist);
  localStorage.setItem('todolist', JSON.stringify(todolist));
};

todoList.addEventListener('click', (e) => {
  const item = e.target;
  // console.log(item);
  if (
    item.classList.contains('fa-trash') ||
    item.classList.contains('trash-btn')
  ) {
    const elementType = item.classList.contains('fa-trash') ? 1 : 2;
    // console.log(elementType);
    const btnContainer =
      elementType === 1 ? item.parentElement.parentElement : item.parentElement;

    const todoListItem = btnContainer.previousElementSibling;
    const todotext = todoListItem.textContent.trim();

    deleteTodo(todotext);
    init();
  } else {
    if (
      item.classList.contains('check-btn') ||
      item.classList.contains('fa-circle-check')
    ) {
      const elementType = item.classList.contains('fa-circle-check') ? 1 : 2;
      console.log(elementType);
      const btnContainer =
        elementType === 1
          ? item.parentElement.parentElement
          : item.parentElement;

      const todoListItem = btnContainer.previousElementSibling;
      const todotext = todoListItem.textContent.trim();

      markComplete(todotext);
      init();
    }
  }
});

const markComplete = (todotext) => {
  let todoArr;
  if (localStorage.getItem('todolist')) {
    todoArr = JSON.parse(localStorage.getItem('todolist'));
  } else {
    todoArr = [];
  }

  const updated = todoArr.map((todo) => {
    if (todo.text === todotext) {
      return { text: todo.text, completed: !todo.completed };
    } else {
      return todo;
    }
  });

  localStorage.setItem('todolist', JSON.stringify(updated));
};

const deleteTodo = (todotext) => {
  let todoArr;
  if (localStorage.getItem('todolist')) {
    todoArr = JSON.parse(localStorage.getItem('todolist'));
  } else {
    todoArr = [];
  }

  const updatedTodoList = todoArr.filter((todo) => {
    return todo.text != todotext;
  });

  localStorage.setItem('todolist', JSON.stringify(updatedTodoList));
};

completedFilter.addEventListener('click', () => {
  let todoArr;
  if (localStorage.getItem('todolist')) {
    todoArr = JSON.parse(localStorage.getItem('todolist'));
  } else {
    todoArr = [];
  }

  let updatedTodoList = todoArr.filter((todo) => {
    return todo.completed === true;
  });
  displayTodoList(updatedTodoList);
});

remainigFilter.addEventListener('click', () => {
  let todoArr;
  if (localStorage.getItem('todolist')) {
    todoArr = JSON.parse(localStorage.getItem('todolist'));
  } else {
    todoArr = [];
  }

  let updatedTodoList = todoArr.filter((todo) => {
    return todo.completed === false;
  });
  displayTodoList(updatedTodoList);
});

allFilter.addEventListener('click', () => {
  init();
});

const displayTodoList = (todolist) => {
  todoList.innerHTML = ``;
  todolist.forEach((todo) => {
    const newTodo = document.createElement('div');
    newTodo.classList.add('todo');

    const newTodoListItem = document.createElement('li');
    newTodoListItem.innerText = todo.text;
    if (todo.completed) {
      newTodoListItem.classList.add('mark-complete');
    }

    const newTodoBtnContainer = document.createElement('div');
    const completeBtn = document.createElement('button');
    completeBtn.classList.add('check-btn');
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('trash-btn');

    completeBtn.innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
    deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;

    newTodoBtnContainer.appendChild(completeBtn);
    newTodoBtnContainer.appendChild(deleteBtn);

    newTodo.appendChild(newTodoListItem);
    newTodo.appendChild(newTodoBtnContainer);

    todoList.appendChild(newTodo);
  });
};
