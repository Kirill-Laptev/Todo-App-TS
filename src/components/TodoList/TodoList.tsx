import React from 'react'
import s from './TodoList.module.css'

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
}

const TodoList: React.FC<PropsType> = (props) => {
    return (
        <div className={s.todolist__block}>
            <div>{props.title}</div>
            <div><input type='text' /><button>+</button></div>
            <ul>
                <li><input type='checkbox' checked={props.tasks[0].isDone} /><span>{props.tasks[0].title}</span></li>
                <li><input type='checkbox' checked={props.tasks[1].isDone} /><span>{props.tasks[1].title}</span></li>
                <li><input type='checkbox' checked={props.tasks[2].isDone} /><span>{props.tasks[2].title}</span></li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}

export default TodoList
