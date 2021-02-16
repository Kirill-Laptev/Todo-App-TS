import React from 'react'
import s from './TodoList.module.css'
import { FilterValuesType, TaskType } from '../../App'
import AddItemForm from './AddItemForm'
import EditableSpan from './EditableSpan'


type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistID: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTask: (value: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, todolistID: string) => void
    filter: FilterValuesType
    todolistID: string
    removeTodolist: (todolistID: string) => void
    editTaskTitle: (value: string, taskID: string) => void
}

const TodoList: React.FC<PropsType> = (props) => {

    const onRemoveTodolist = () => {
        props.removeTodolist(props.todolistID)
    }

    const onAllClickHandler = () => {
        props.changeFilter('all', props.todolistID)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.todolistID)
    }
    const onComplitedClickHandler = () => {
        props.changeFilter('complited', props.todolistID)
    }

    const addTask = (inputValue: string) => {
        props.addTask(inputValue, props.todolistID)
    }


    return (
        <div className={s.todolist__block}>
            <div>{props.title}<button onClick={onRemoveTodolist}>X</button></div>
            <AddItemForm addItem={addTask} />
            <ul>
                {props.tasks.map((task) => {

                    const editTaskTitle = (value: string) => {
                        props.editTaskTitle(value, task.id)
                    }

                    const onCrossClickHandler = () => {
                        props.removeTask(task.id, props.todolistID)
                    }

                    const changeTaskStatusHandler = () => {
                        props.changeTaskStatus(task.id, props.todolistID)
                    }

                    return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                    <input type='checkbox' checked={task.isDone}  onChange={changeTaskStatusHandler}/>
                    <EditableSpan title={task.title} editTaskTitle={editTaskTitle}/>
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
