import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchtodolist, setCompleted } from "../../action";
import AddTodo from "../addTodo/addTodo";
import Button from "@mui/material/Button";
import TodoDetail from "../todoDetail/todoDetail";
import "./todoList.sass";
import EditTodo from "../editTodo/editTodo";
import CompletedList from "./completedList/completedList";

const TodoList = (props) => {
  const [open, setopen] = useState(false);
  const [Id, setId] = useState();
  useEffect(() => {
    props.fetchtodolist();
  }, []);

  if (!props.TodoList) {
    throw new Error("add new task");
  }

  const addBtn = () => {
    return (
      <div className="add-btn">
        <p>+</p>
      </div>
    );
  };

  const handlestatusbtn = (status) => {
    if (status == "low") {
      return (
        <div className="status-pointer">
          {status}
          <div className="status-color-low"></div>
        </div>
      );
    } else if (status == "medium") {
      return (
        <div className="status-pointer">
          {status}
          <div className="status-color-medium"></div>
        </div>
      );
    } else if (status == "high") {
      return (
        <div className="status-pointer">
          {status}
          <div className="status-color-high"></div>
        </div>
      );
    }
  };

  const handleTodoList = () => {
    return props.TodoList.map((item) => {
      if (item.status == false) {
        return (
          <div key={item.id}>
            <div className="todo-item" onClick={() => setId(item.id)}>
              <TodoDetail
                id={Id}
                btnText={
                  <div
                    className="todo-item-body todo-item-header"
                    // onClick={() => setopen(true)}
                  >
                    <div className="todo-item-title">{item.title}</div>
                    <div className="todo-item-status">
                      {handlestatusbtn(item.level)}
                    </div>
                  </div>
                }
              />
              <div className="todo-item-body todo-item-footer">
                <div className="todo-item-description">
                  {item.description ? (
                    item.description
                  ) : (
                    <p>Task Dot`t Have Description</p>
                  )}
                </div>
                <div>
                  <Button
                    color="secondary"
                    size="small"
                    onClick={(e) => setCompleted(item.id, props.TodoList)}
                  >
                    Done Task
                  </Button>
                  <EditTodo btnText={"Edit Task"} id={Id} />
                </div>
              </div>
              {/* <div className="todo-item-title"></div> */}
            </div>
          </div>
        );
      }
    });
  };

  return (
    <div className="todo-items">
      <div className="todo-list-header">
        <CompletedList btnText={"View Done Tasks"} />
        <h3>Hello World</h3>
      </div>
      {handleTodoList()}
      <AddTodo btnText={addBtn()} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { TodoList: state.ToDoList };
};

export default connect(mapStateToProps, { fetchtodolist, setCompleted })(
  TodoList
);
