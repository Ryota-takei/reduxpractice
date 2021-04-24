import { useSelector } from "react-redux";
import { TaskItem } from "../taskItem/TaskItem";
import { selectTasks } from "../taskSlice";
import styles from "./TaskList.module.scss";

export const TaskList: React.VFC = () => {
  const tasks = useSelector(selectTasks);
  return (
    <div className={styles.root}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};
