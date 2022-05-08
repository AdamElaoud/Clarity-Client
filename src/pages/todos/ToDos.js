import TaskMatrix from "../../components/todos/matrix/TaskMatrix";
import ToDoList from "../../components/todos/todolist/ToDoList";
import WeekView from "../../components/todos/weekview/WeekView";
import "./ToDos.css";

export default function ToDos() {
    return (
        <div id = "todos">
            <div id = "todos-title">
                To Dos
            </div>
            <div id = "todo-data">
                <TaskMatrix />
                <ToDoList />
            </div>

            <WeekView />
        </div>
    );
}