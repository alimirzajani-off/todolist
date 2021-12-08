import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { fetchtodolist, sendTodo } from "../../action";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Radio, RadioGroup, TextField } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
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

const renderError = ({ error, touched }) => {
  if (touched && error) {
    return <div>{error}</div>;
  }
};

const renderInput = ({ input, meta, label, type }) => {
  return (
    <>
      <TextField label={label} variant="standard" type={type} {...input} />
      <div>{renderError(meta)}</div>
    </>
  );
};

const renderRadioGroup = ({ input, ...rest }) => (
  <RadioGroup
    {...input}
    {...rest}
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);

const onSubmit = (values) => {
  console.log(values);
};

const AddTodo = (props) => {
  const [open, setOpen] = useState(false);
  const [TaskList, setTaskList] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setTodoList();
  }, [open]);

  const setTodoList = () => {
    props.fetchtodolist();
    setTaskList(props.TodoList);
  };

  const handleSendTask = () => {
    const Task = { ...props.formValue.values };
    Task.status = false;
    Task.id = uuidv4();
    TaskList.push(Task);
    props.sendTodo(TaskList);
    setOpen(false);
  };

  const { handleSubmit, valid } = props;
  return (
    <div>
      <Button onClick={handleOpen}>{props.btnText}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" sx={style} onSubmit={handleSubmit}>
          <div className="add-form-text">
            <Field
              label="Task Title"
              name="title"
              type="text"
              component={renderInput}
            />
            <Field
              label="Task Description"
              name="description"
              type="text"
              component={renderInput}
            />
            <Field
              label="Task Gift"
              name="gift"
              type="text"
              component={renderInput}
            />
            <Field name="level" component={renderRadioGroup}>
              <Radio value="low" label="Low" />
              <Radio value="medium" label="Medium" />
              <Radio value="high" label="High" />
            </Field>
            <div className="add-form-submit-btn">
              <Button
                variant="contained"
                type="submit"
                disabled={!valid}
                onClick={(e) => handleSendTask()}
              >
                Add To Tasks
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { TodoList: state.ToDoList, formValue: state.form.AddTodo };
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

export default reduxForm({
  form: "AddTodo",
  onSubmit,
  validate,
})(connect(mapStateToProps, { fetchtodolist, sendTodo })(AddTodo));
