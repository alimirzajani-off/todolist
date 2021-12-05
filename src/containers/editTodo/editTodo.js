import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchtodolist, setUpdateList } from "../../action";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
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
    setTodoList();
  }, [open]);

  const setTodoList = () => {
    props.fetchtodolist();
    setTaskList(props.TodoList);
  };

  const controlProps = (level, item) => ({
    checked: TaskLevel === item,
    onChange: handleTaskLevel,
    value: level ? item : level,
  });

  const setDetail = (id, title, description, gift, level) => {
    const Task = {};
    Task.title = TaskTitle || title;
    Task.description = TaskDescription || description;
    Task.gift = TaskGift || gift;
    Task.level = TaskLevel || level;
    Task.status = false;
    Task.id = id;
    props.setUpdateList(id, TaskList, Task);
    setOpen(false);
  };
  const showDetail = () => {
    return TaskList.map((item) => {
      if (item.id === props.id) {
        return (
          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                component="form"
                sx={style}
                noValidate
                autoComplete="off"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="add-form-text">
                  <TextField
                    label={"Task Title"}
                    variant="standard"
                    value={TaskTitle ? TaskTitle : item.title}
                    onChange={(e) => setTaskTitle(e.target.value)}
                  />
                  <TextField
                    label={"Task Description"}
                    variant="standard"
                    value={TaskDescription ? TaskDescription : item.description}
                    onChange={(e) => setTaskDescription(e.target.value)}
                  />
                  <TextField
                    label={"Gifts and KPI for this task ;)"}
                    variant="standard"
                    value={TaskGift ? TaskGift : item.gift}
                    onChange={(e) => setTaskGift(e.target.value)}
                  />
                </div>
                <RadioGroup className="add-form-radio">
                  <FormControlLabel
                    value="low"
                    control={<Radio {...controlProps(item.level, "low")} />}
                    label="LOW"
                  />
                  <FormControlLabel
                    value="medium"
                    control={<Radio {...controlProps(item.level, "medium")} />}
                    label="MEDIUM"
                  />
                  <FormControlLabel
                    value="high"
                    control={<Radio {...controlProps(item.level, "high")} />}
                    label="HIGH"
                  />
                </RadioGroup>
                <div className="add-form-submit-btn">
                  <Button
                    variant="contained"
                    onClick={(e) =>
                      setDetail(
                        item.id,
                        item.title,
                        item.description,
                        item.gift,
                        item.level
                      )
                    }
                  >
                    Edit Task
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
      {TaskList ? (
        <>
          <Button onClick={handleOpen}>{props.btnText}</Button>
          {showDetail()}
        </>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return { TodoList: state.ToDoList };
};

export default connect(mapStateToProps, { fetchtodolist, setUpdateList })(
  EditTodo
);
