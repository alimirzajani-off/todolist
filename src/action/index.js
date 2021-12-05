import { DELETE, GET, SET } from "../service";

export const fetchtodolist = () => async (dispatch) => {
  const response = await GET().then((res) => res);
  dispatch({ type: "FETCH_TODO_LIST", payload: response });
};

export const sendTodo = (Task) => async (dispatch) => {
  await SET(Task).then(() => fetchtodolist());
};

export const setCompleted = (id, TaskList) => {
  let TodoList = TaskList;
  TodoList.map((item) => {
    if (item.id == id) {
      item.status = true;
    }
  });
  SET(TodoList);
};

export const setUpdateList = (id, TaskList, editData) => async (dispatch) => {
  let TodoList = TaskList;
  TodoList.map((item) => {
    if (item.id == id) {
      item.title = editData.title;
      item.description = editData.description;
      item.gift = editData.gift;
      item.level = editData.level;
      item.status = editData.status;
      item.id = editData.id;
    }
  });
  await SET(TodoList).then(() => fetchtodolist());
};

export const deleteTodo = (Task, index) => {
  DELETE(Task, index).then(() => fetchtodolist());
};
