import { getTodo, setTodo } from "../service";

export const fetchtodolist = () => async (dispatch) => {
  const response = await getTodo().then((res) => res);
  dispatch({ type: "FETCH_TODO_LIST", payload: response });
};

export const sendTodo = (Task) => async (dispatch) => {
  await setTodo(Task).then(() => fetchtodolist());
};
