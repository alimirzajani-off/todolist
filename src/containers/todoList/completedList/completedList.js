import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchtodolist } from "../../../action";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import "./completedList.sass";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const CompletedList = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setTodoList();
  }, [open]);

  const setTodoList = () => {
    props.fetchtodolist();
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

  const showTaskCompleted = () => {
    return props.TodoList.map((item) => {
      if (item.status == true) {
        return (
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            key={item.id}
          >
            <div>
              <div className="todo-item">
                <div
                  className="todo-item-body todo-item-header"
                  onClick={() => setOpen(true)}
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
                </div>
              </div>
            </div>
          </Typography>
        );
      }
    });
  };

  return (
    <div>
      <Button onClick={handleOpen}>{props.btnText}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="completed-list"
      >
        <Box sx={style}>
          <h4 className="completed-modal-title">Done Tasks</h4>
          {showTaskCompleted()}
        </Box>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { TodoList: state.ToDoList };
};

export default connect(mapStateToProps, { fetchtodolist })(CompletedList);
