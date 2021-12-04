import { combineReducers } from "redux";
import todoList from "./todoList";

export default combineReducers({
  ToDoList: todoList,
});
