import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchtodolist, sendTodo } from "../../action";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Radio, RadioGroup, TextField } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import "./editTodo.sass";

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

const EditTodo = (props) => {
  const [open, setOpen] = useState(false);
  const [TaskList, setTaskList] = useState();
  const [TaskTitle, setTaskTitle] = useState("");
  const [TaskDescription, setTaskDescription] = useState("");
  const [TaskGift, setTaskGift] = useState("");
  const [TaskLevel, setTaskLevel] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleTaskLevel = (e) => {
    setTaskLevel(e.target.value);
  };

  useEffect(() => {
    props.fetchtodolist();
    setTodoList();
  }, [open]);

  const setTodoList = () => {
    props.fetchtodolist();
    setTaskList(props.TodoList);
  };

  const controlProps = (item) => ({
    checked: TaskLevel === item,
    onChange: handleTaskLevel,
    value: item,
  });

  const handleSendTask = () => {
    const Task = {};
    Task.title = TaskTitle;
    Task.description = TaskDescription;
    Task.gift = TaskGift;
    Task.level = TaskLevel;
    Task.status = false;
    Task.id = uuidv4();
    TaskList.push(Task);
    props.sendTodo(TaskList);
    setOpen(false);
  };

  const showDetail = () => {
    return props.TodoList.map((item) => {
      if (item.id && item.id === props.id) {
        setTaskLevel(item.level);
        return (
          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box component="form" sx={style} noValidate autoComplete="off">
                <div className="add-form-text">
                  <TextField
                    label={item.title ? item.title : "Task Title"}
                    variant="standard"
                    onChange={(e) => setTaskTitle(e.target.value)}
                  />
                  <TextField
                    label={
                      item.description ? item.description : "Task Description"
                    }
                    variant="standard"
                    onChange={(e) => setTaskDescription(e.target.value)}
                  />
                  <TextField
                    label={
                      item.gift ? item.gift : "Gifts and KPI for this task ;)"
                    }
                    variant="standard"
                    onChange={(e) => setTaskGift(e.target.value)}
                  />
                </div>
                <RadioGroup className="add-form-radio">
                  <Radio {...controlProps("low")} color="secondary" />
                  <Radio {...controlProps("medium")} color="success" />
                  <Radio {...controlProps("high")} color="primary" />
                </RadioGroup>
                <div className="add-form-submit-btn">
                  <Button variant="contained" onClick={() => handleSendTask()}>
                    Add To Tasks
                  </Button>
                </div>
              </Box>
            </Modal>
          </div>
        );
      }
    });
  };

  return (
    <>
      <Button onClick={handleOpen}>{props.btnText}</Button>
      {showDetail()}
    </>
  );
};

const mapStateToProps = (state) => {
  return { TodoList: state.ToDoList };
};

export default connect(mapStateToProps, { fetchtodolist, sendTodo })(EditTodo);