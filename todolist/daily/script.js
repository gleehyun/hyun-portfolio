const todoList = document.querySelector(".todo");
const dailyTodoList = document.querySelector("#daily_todo");
const routineTodoList = document.querySelector(".daily.routine ul");
const form = document.querySelector("form");
const noteTextarea = document.querySelector("#note");

let todos = [];
let dailyTodos = [];
let routineTodos = [];
let noteContent = "";

const save = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const delItem = (e) => {
  const target = e.target.parentElement;
  if (target.nextSibling) {
    target.nextSibling.remove();
  }
  todos = todos.filter((todo) => todo.id != target.id);
  dailyTodos = dailyTodos.filter((todo) => todo.id != target.id);
  routineTodos = routineTodos.filter((todo) => todo.id != target.id);
  target.remove();
  save("todos", todos);
  save("dailyTodos", dailyTodos);
  save("routineTodos", routineTodos);
};

const toggleClass = (element, className) => {
  if (element.classList.contains(className)) {
    element.classList.remove(className);
  } else {
    element.classList.add(className);
  }
};

const addItem = (todo, list) => {
  if (todo !== "") {
    const todoLi = document.createElement("li");
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("list");
    const todoSpan = document.createElement("span");
    const todoP = document.createElement("p");
    const todoBtn = document.createElement("button");
    const todoHr = document.createElement("hr");
    todoP.innerText = todo.text;
    todoBtn.innerText = "del";
    todoBtn.addEventListener("click", delItem);
    todoLi.appendChild(todoDiv);
    todoLi.appendChild(todoHr);
    todoDiv.appendChild(todoSpan);
    todoDiv.appendChild(todoP);
    todoDiv.appendChild(todoBtn);
    list.appendChild(todoLi);
    todoLi.id = todo.id;

    // Add click event to the important span
    todoSpan.addEventListener("click", () => toggleClass(todoSpan, "important"));

    // Add click event to the todoP
    todoP.addEventListener("click", () => toggleClass(todoP, "finish"));
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
    addItem(todo, dailyTodoList);
    save("todos", todos);
    todoList.value = "";
  } else {
    alert("오늘 할 일을 입력하세요!");
  }
};

const routineHandler = (e) => {
  e.preventDefault();
  const routineText = document.querySelector("#todo_routine").value;
  const routine = {
    id: Date.now(),
    text: routineText,
  };
  if (routineText !== "") {
    routineTodos.push(routine);
    addItem(routine, routineTodoList);
    save("routineTodos", routineTodos);
    document.querySelector("#todo_routine").value = "";
  } else {
    alert("데일리 루틴을 입력하세요!");
  }
};

const saveNote = () => {
  noteContent = noteTextarea.value;
  document.cookie = `note=${encodeURIComponent(noteContent)}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
};

const loadNote = () => {
  const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)note\s*=\s*([^;]*).*$)|^.*$/, "$1");
  noteTextarea.value = decodeURIComponent(cookieValue);
};

const init = () => {
  const userTodos = JSON.parse(localStorage.getItem("todos")) || [];
  const userDailyTodos = JSON.parse(localStorage.getItem("dailyTodos")) || [];
  const userRoutineTodos = JSON.parse(localStorage.getItem("routineTodos")) || [];

  userTodos.forEach((todo) => addItem(todo, dailyTodoList));
  userDailyTodos.forEach((todo) => addItem(todo, dailyTodoList));
  userRoutineTodos.forEach((todo) => addItem(todo, routineTodoList));

  todos = userTodos;
  dailyTodos = userDailyTodos;
  routineTodos = userRoutineTodos;

  loadNote();
};

init();
form.addEventListener("submit", handler);
document.querySelector("#enter_routine").addEventListener("click", routineHandler);
noteTextarea.addEventListener("input", saveNote);