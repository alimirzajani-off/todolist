import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchtodolist, setCompleted, deleteTodo } from "../../action";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./todoDetail.sass";
import EditTodo from "../editTodo/editTodo";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TodoDetail = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    props.fetchtodolist();
  }, [open]);

  const handlestatusbtn = (status) => {
    if (status == "low") {
      return (
        <div className="status-pointer">
          <div className="status-color-low"></div>
          {status}
        </div>
      );
    } else if (status == "medium") {
      return (
        <div className="status-pointer">
          <div className="status-color-medium"></div>
          {status}
        </div>
      );
    } else if (status == "high") {
      return (
        <div className="status-pointer">
          <div className="status-color-high"></div>
          {status}
        </div>
      );
    }
  };

  const handleDelete = (todo, index) => {
    deleteTodo(todo, index);
    setOpen(false);
  };

  const handleCompleted = (id, todo) => {
    setCompleted(id, todo);
    setOpen(false);
  };

  const showDetail = () => {
    return props.TodoList.map((item, index) => {
      if (item.id && item.id === props.id) {
        return (
          <Typography id="modal-modal-title">
            <div className="detail-title">
              <div className="detail-title-level">
                {handlestatusbtn(item.level)}
              </div>
              <div className="detail-title-title">
                <h4>{item.title}</h4>
              </div>
            </div>
            <div className="detail-body">
              {item.description}
              <div>
                <Button
                  color="error"
                  size="small"
                  onClick={(e) => handleDelete(props.TodoList, index)}
                >
                  Delete Task
                </Button>
                <Button
                  color="success"
                  size="small"
                  onClick={(e) => handleCompleted(item.id, props.TodoList)}
                >
                  Done Task
                </Button>
                <EditTodo btnText={"Edit Task"} id={item.id} />
              </div>
            </div>
          </Typography>
        );
      }
    });
  };

  return (
    <div>
      <div onClick={handleOpen}>{props.btnText}</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" sx={style} onSubmit={(e) => e.preventDefault()}>
          {showDetail()}
        </Box>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { TodoList: state.ToDoList };
};

export default connect(mapStateToProps, {
  fetchtodolist,
  setCompleted,
  deleteTodo,
})(TodoDetail);
