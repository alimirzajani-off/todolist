var todoList;

export const getTodo = () => {
  return new Promise((resolve, reject) => {
    let storage = localStorage.getItem("todolist");
    todoList = JSON.parse(localStorage.getItem("todolist")) || [];
    resolve(todoList);
  });
};

export const setTodo = (Task) => {
  return new Promise((resolve, reject) => {
    localStorage.setItem("todolist", JSON.stringify(Task));
  });
};
