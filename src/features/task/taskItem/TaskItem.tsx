import styles from "./TaskItem.module.scss";
import Checkbox from "@material-ui/core/Checkbox";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  handleModalOpen,
  selectIsModalOpen,
  selectTask,
  checkTask,
} from "../taskSlice";
import Modal from "@material-ui/core/Modal";
import { TaskForm } from "../taskForm/TaskForm";

interface PropType {
  task: { id: number; title: string; completed: boolean };
}

export const TaskItem: React.VFC<PropType> = (props) => {
  const idModalOpen = useSelector(selectIsModalOpen);
  const { task } = props;
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(selectTask(task));
    dispatch(handleModalOpen(true));
  };

  const handleClose = () => {
    dispatch(handleModalOpen(false));
  };

  const clickDeleteTask = (id: number) => {
    const confirmDelete = window.confirm("本当に削除しますか？");

    if (confirmDelete) {
      dispatch(deleteTask(id));
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <EditIcon />
        <div className={styles.title_text}>{task.title}</div>
      </div>
      <div className={styles.right_item}>
        <Checkbox
          checked={task.completed}
          onChange={() => dispatch(checkTask(task))}
          className={styles.Checkbox}
        />
        <button onClick={handleOpen} className={styles.edit_button}>
          <EditIcon className={styles.icon} />
        </button>
        <button
          onClick={() => clickDeleteTask(task.id)}
          className={styles.delete_button}
        >
          <DeleteIcon className={styles.icon} />
        </button>
      </div>
      <Modal
        className={styles.modal}
        open={idModalOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={styles.modal_content}>
          <div className={styles.modak_title}>Edit</div>
          <TaskForm edit />
        </div>
      </Modal>
    </div>
  );
};
