import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import todoList from "./todoList";

export default combineReducers({
  ToDoList: todoList,
  form: reduxFormReducer,
});
