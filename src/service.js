var todoList;

export const GET = () => {
  return new Promise((resolve, reject) => {
    let storage = localStorage.getItem("todolist");
    todoList = JSON.parse(localStorage.getItem("todolist")) || [];
    resolve(todoList);
  });
};

export const SET = (Task) => {
  return new Promise((resolve, reject) => {
    localStorage.setItem("todolist", JSON.stringify(Task));
  });
};

export const DELETE = (Task, index) => {
  return new Promise((resolve, reject) => {
    if (index > -1) {
      Task.splice(index, 1);
      localStorage.setItem("todolist", JSON.stringify(Task));
      resolve("removed successfully");
    } else {
      reject("something wrong");
    }
  });
};
