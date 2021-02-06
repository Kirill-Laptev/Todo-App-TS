import React from 'react'
import s from './TodoList.module.css'
import { FilterValuesType } from '../../App'

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (value: string) => void
}

const TodoList: React.FC<PropsType> = (props) => {

    const [value, setValue] = React.useState('')

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    const handleOnAddTask = () => {
        props.addTask(value)
        setValue('')
    }

    const onPressKeyHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.charCode === 13){
            handleOnAddTask()
        }
    }

    const onAllClickHandler = () => {
        props.changeFilter('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }
    const onComplitedClickHandler = () => {
        props.changeFilter('complited')
    }

    return (
        <div className={s.todolist__block}>
            <div>{props.title}</div>
            <div>
                <input type='text' onChange={handleOnChange} onKeyPress={onPressKeyHandler} value={value}/>
                <button onClick={handleOnAddTask}>+</button></div>
            <ul>
                {props.tasks.map((task) => {
                    return <li key={task.id}>
                    <input type='checkbox' checked={task.isDone} />
                    <span>{task.title}</span>
                    <button onClick={() => props.removeTask(task.id)}>x</button>
                    </li>            
                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onComplitedClickHandler}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList
