import TaskMatrix from "../../components/todos/matrix/TaskMatrix";
import ToDoList from "../../components/todos/todolist/ToDoList";
import WeekView from "../../components/todos/weekview/WeekView";
import "./ToDos.css";

export default function ToDos() {
    return (
        <div id = "todos">
            <TaskMatrix />
            <ToDoList />
            <WeekView />
        </div>
    );
}