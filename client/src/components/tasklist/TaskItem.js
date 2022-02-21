import "./TaskItem.css";

/*
    props
    - task       {} | object containing information about task to be displayed
*/
export default function TaskItem(props) {
    const date = new Date(props.task.date);
    const hours = date.getHours();
    const min = date.getMinutes();
    const minutes = min < 10 ? `0${min}` : min;

    return (
        <li className = "task-item">
            <div className = "task-xp">
                {props.task.xp}
            </div>

            <div className = "task-data">
                <div className = "task-heading">
                    <div className = "task-project">
                        {props.task.proj}
                    </div>
                    <div className = "task-category">
                        {props.task.cat}
                    </div>
                </div>

                <div className = "task-description">
                    {props.task.desc}
                </div>
            </div>

            <div className = "task-time">
                {hours}:{minutes}
            </div>
        </li>
    );
}