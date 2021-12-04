import { getTodo, setTodo } from "../service";

export const fetchtodolist = () => async (dispatch) => {
  const response = await getTodo().then((res) => res);
  dispatch({ type: "FETCH_TODO_LIST", payload: response });
};

export const sendTodo = (Task) => async (dispatch) => {
  await setTodo(Task).then(() => fetchtodolist());
};

export const setCompleted = (id, TaskList) => {
  let TodoList = TaskList;
  TodoList.map((item) => {
    if (item.id == id) {
      item.status = true;
    }
  });
  setTodo(TodoList);
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
  await setTodo(TodoList).then(() => fetchtodolist());
};
