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
    removeTask: (id: string, todolistID: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTask: (value: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, todolistID: string) => void
    filter: FilterValuesType
    id: string
    removeTodolist: (todolistID: string) => void
}

const TodoList: React.FC<PropsType> = (props) => {

    const [value, setValue] = React.useState('')
    const [error, setError] = React.useState<string | null>(null);

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setValue(event.target.value)
    }

    const onAddTaskHandler = () => {
        if(value.trim()){    
            props.addTask(value.trim(), props.id)
            setValue('')
        } else{
            setError('Field is required')
        }
    }

    const onPressKeyHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.charCode === 13){
            onAddTaskHandler()
        }
    }

    const onRemoveTodolist = () => {
        props.removeTodolist(props.id)
    }

    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onComplitedClickHandler = () => {
        props.changeFilter('complited', props.id)
    }

    return (
        <div className={s.todolist__block}>
            <div>{props.title}<button onClick={onRemoveTodolist}>X</button></div>
            <div>
                <input 
                    type='text' 
                    className={error ? 'error' : ''}
                    onChange={onChangeHandler} 
                    onKeyPress={onPressKeyHandler} 
                    value={value}/>
                <button onClick={onAddTaskHandler}>+</button></div>
                {error && <div className='error__message'>{error}</div>}
            <ul>
                {props.tasks.map((task) => {

                    const onCrossClickHandler = () => {
                        props.removeTask(task.id, props.id)
                    }

                    const changeTaskStatusHandler = () => {
                        props.changeTaskStatus(task.id, props.id)
                    }

                    return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                    <input type='checkbox' checked={task.isDone}  onChange={changeTaskStatusHandler}/>
                    <span>{task.title}</span>
                    <button onClick={onCrossClickHandler}>x</button>
                    </li>            
                })}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active__filter' : ''} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active' ? 'active__filter' : ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'complited' ? 'active__filter' : ''} onClick={onComplitedClickHandler}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList
