import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchtodolist } from "../../action";
import AddTodo from "../addTodo/addTodo";
import Button from "@mui/material/Button";
import TodoDetail from "../todoDetail/todoDetail";
import "./todoList.sass";
import EditTodo from "../editTodo/editTodo";

const TodoList = (props) => {
  const [open, setopen] = useState(false);
  const [Id, setId] = useState();
  useEffect(() => {
    props.fetchtodolist();
  }, []);

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
      return (
        <>
          <div className="todo-item" onClick={() => setId(item.id)}>
            <div
              className="todo-item-body todo-item-header"
              onClick={() => setopen(true)}
            >
              <div className="todo-item-title">{item.title}</div>
              <div className="todo-item-status">
                {handlestatusbtn(item.level)}
              </div>
            </div>
            <div className="todo-item-body todo-item-footer">
              <div className="todo-item-description">
                {item.description ? (
                  item.description
                ) : (
                  <p>Task Dot`t Have Description</p>
                )}
              </div>
              <div>
                <Button color="secondary" size="small">
                  Done Task
                </Button>
                <EditTodo
                  btnText={
                    <Button variant="contained" color="success" size="small">
                      Edit Task
                    </Button>
                  }
                  id={Id}
                />
              </div>
            </div>
            {/* <div className="todo-item-title"></div> */}
          </div>
        </>
      );
    });
  };

  return (
    <div className="todo-items">
      <div className="todo-list-header">
        <Button variant="contained" size="small">
          View Done Tasks
        </Button>
        <h3>Hello World</h3>
      </div>
      {handleTodoList()}
      <AddTodo btnText={addBtn()} />
      {open ? <TodoDetail open={open} id={Id} /> : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { TodoList: state.ToDoList };
};

export default connect(mapStateToProps, { fetchtodolist })(TodoList);
