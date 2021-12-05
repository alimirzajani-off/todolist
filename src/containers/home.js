import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchtodolist } from "../action";
import AddTodo from "./addTodo/addTodo";
import TodoList from "./todoList/todoList";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

const Home = (props) => {
  useEffect(() => {
    props.fetchtodolist();
  }, []);

  const handleStart = () => {
    if (props.TodoList.length == 0) {
      return (
        <div>
          <h3>Hello World!</h3>
          <AddTodo btnText={"Ceata Your First Task ;) "} />
        </div>
      );
    } else {
      return (
        <ErrorBoundary>
          <TodoList />
        </ErrorBoundary>
      );
    }
  };

  return <div>{handleStart()}</div>;
};

const mapStateToProps = (state) => {
  return { TodoList: state.ToDoList };
};

export default connect(mapStateToProps, { fetchtodolist })(Home);
