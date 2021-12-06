import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { fetchtodolist, sendTodo } from "../../action";
import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import "./addTodo.sass";

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

const validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = "please input title";
  }
  if (!values.description) {
    errors.description = "please input description";
  }
  if (!values.gift) {
    errors.gift = "please input gift";
  }
  return errors;
};

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <div>
    <div>
      <TextField {...input} type={type} label={label} variant="standard" />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const AddTodo = (props) => {
  const [open, setOpen] = useState(false);
  const [hasError, sethasError] = useState(false);
  const [TaskList, setTaskList] = useState();
  const [TaskTitle, setTaskTitle] = useState("");
  const [TaskDescription, setTaskDescription] = useState("");
  const [TaskGift, setTaskGift] = useState("");
  const [TaskLevel, setTaskLevel] = useState("low");
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
    sethasError(false);
    setTaskTitle("");
    setTaskGift("");
    setTaskDescription("");
  };

  const { handleSubmit, pristine, reset, submitting } = props;

  return (
    <div>
      <Button onClick={handleOpen}>{props.btnText}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" sx={style} noValidate autoComplete="off">
          <div className="add-form-text">
            <form onSubmit={handleSubmit}>
              <Field
                name="title"
                type="text"
                component={renderField}
                label="Task Title"
                onChange={(e) => setTaskTitle(e.target.value)}
              />
              <Field
                name="description"
                type="text"
                component={renderField}
                label="Task Description"
                onChange={(e) => setTaskDescription(e.target.value)}
              />
              <Field
                name="gift"
                type="text"
                component={renderField}
                label="Task Gift"
                onChange={(e) => setTaskGift(e.target.value)}
              />
              <RadioGroup className="add-form-radio">
                <FormControlLabel
                  value="low"
                  control={<Radio {...controlProps("low")} />}
                  label="LOW"
                />
                <FormControlLabel
                  value="medium"
                  control={<Radio {...controlProps("medium")} />}
                  label="MEDIUM"
                />
                <FormControlLabel
                  value="high"
                  control={<Radio {...controlProps("high")} />}
                  label="HIGH"
                />
              </RadioGroup>
            </form>
          </div>

          <div className="add-form-submit-btn">
            <Button
              variant="contained"
              type="submit"
              onClick={() => handleSendTask()}
              disabled={pristine || submitting}
            >
              Add To Tasks
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { TodoList: state.ToDoList };
};

export default reduxForm({
  form: "syncValidation",
  validate,
})(connect(mapStateToProps, { fetchtodolist, sendTodo })(AddTodo));
