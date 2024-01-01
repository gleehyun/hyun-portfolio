const todoList = document.querySelector(".todo");
const dailyTodoDiv = document.querySelector(".today_list .enter_wrap_todo");
const form = document.querySelector("#todoForm");
const startDateValue = new Date(); // 실제 날짜 값으로 대체하세요
const formattedDate = startDateValue.toISOString().slice(0, 10);
const dateInput = document.querySelector(".selectDay");
dateInput.value = formattedDate;

let todos = [];

const save = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const delItem = (e) => {
  const target = e.target.parentElement.parentElement;
  const listType = target.closest("ul").id;

  if (target.nextSibling) {
    target.nextSibling.remove();
  }

  if (listType === "daily_todo") {
    todos = todos.filter((todo) => todo.id != target.id);
  }

  target.remove();
  save("todos", todos);
};

const toggleClass = (element, className) => {
  element.classList.toggle(className);
};

const addItem = (todo) => {
  if (todo !== "") {
    const todoLi = document.createElement("li");
    todoLi.innerHTML = `
      <div class="list">
        <span></span>
        <p>${todo.text}</p>
        <button onclick="delItem(event)">del</button>
      </div>
      <hr />
    `;
    const todoSpan = todoLi.querySelector('span');
    const todoP = todoLi.querySelector('p');

    todoSpan.addEventListener("click", () => toggleClass(todoSpan, "important"));
    todoP.addEventListener("click", () => toggleClass(todoP, "finish"));

    const dailyTodoUl = dailyTodoDiv.nextElementSibling;
    if (dailyTodoUl) {
      dailyTodoUl.appendChild(todoLi);
      todoLi.id = todo.id;
    } else {
      console.error("Error: daily_todo ul not found");
      const newDailyTodoUl = document.createElement('ul');
      newDailyTodoUl.appendChild(todoLi);
      dailyTodoDiv.appendChild(newDailyTodoUl);
      todoLi.id = todo.id;
    }
  }
};

const handler = (e) => {
  e.preventDefault();
  const todoText = todoList.value;
  const todo = {
    id: Date.now(),
    text: todoText,
  };
  if (todoText !== "") {
    todos.push(todo);
    addItem(todo);
    save("todos", todos);
    todoList.value = "";
  } else {
    alert("할 일을 입력하세요!");
  }
};

const init = () => {
  const userTodos = JSON.parse(localStorage.getItem("todos")) || [];

  if (userTodos.length > 0) {
    userTodos.forEach((todo) => addItem(todo));
    todos = userTodos;
  }
};

init();
form.addEventListener("submit", handler);