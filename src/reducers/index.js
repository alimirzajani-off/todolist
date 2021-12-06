import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import todoList from "./todoList";

export default combineReducers({
  ToDoList: todoList,
  form: formReducer,
});
