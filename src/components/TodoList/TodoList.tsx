import React from 'react'
import s from './TodoList.module.css'
import { FilterValuesType } from '../../App'

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    onChangeFilter: (value: FilterValuesType) => void
}

const TodoList: React.FC<PropsType> = (props) => {
    return (
        <div className={s.todolist__block}>
            <div>{props.title}</div>
            <div><input type='text' /><button>+</button></div>
            <ul>
                {props.tasks.map((task) => {
                    return <li>
                    <input type='checkbox' checked={task.isDone} />
                    <span>{task.title}</span>
                    <button onClick={() => props.removeTask(task.id)}>x</button>
                    </li>            
                })}
            </ul>
            <div>
                <button onClick={() => props.onChangeFilter('all')}>All</button>
                <button onClick={() => props.onChangeFilter('active')}>Active</button>
                <button onClick={() => props.onChangeFilter('complited')}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList
