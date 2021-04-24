import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import styles from "./TaskForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { createTask, editTask, handleModalOpen, selectSeletedTask } from "../taskSlice";

type Input = {
  taskTitle: string;
};
type Props = {
  edit?: boolean;
};

export const TaskForm: React.VFC<Props> = (props) => {
  const { edit} = props;
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const selectTak = useSelector(selectSeletedTask)

  const handleCreate = (data: Input) => {
    dispatch(createTask(data.taskTitle));
    reset();
  };

  const handleEdit = (data: Input) => {
    const sendData = {...selectTak, title: data.taskTitle}
    dispatch(editTask(sendData))
    dispatch(handleModalOpen(false))
  };
  return (
    <div className={styles.root}>
      <form
        onSubmit={edit ? handleSubmit(handleEdit) : handleSubmit(handleCreate)}
        className={styles.form}
      >
        <TextField
          id="outlined-basic"
          label={edit ? "Edit Task" : "New Task"}
          defaultValue={edit && selectTak.title}
          variant="outlined"
          {...register("taskTitle", { required: true })}
          name="taskTitle"
          className={styles.text_field}
        />
        {edit && (
          <div className={styles.button_wrapper}>
            <button type="submit" className={styles.submit_button}>
              Submit
            </button>
            <button
              type="button"
              className={styles.cancel_button}
              onClick={() => dispatch(handleModalOpen(false))}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
