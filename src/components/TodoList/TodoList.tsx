import React from 'react'
import s from './TodoList.module.css'
import { FilterValuesType, TaskType } from '../../App'
import AddItemForm from './AddItemForm'
import EditableSpan from './EditableSpan'
import { Button, Checkbox, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'


type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistID: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTask: (value: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, todolistID: string, isDone: boolean) => void
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
            <span className={s.todolist__name}>{props.title}</span>
            <IconButton onClick={onRemoveTodolist}>
                <Delete />
            </IconButton>
            <AddItemForm addItem={addTask} />
            
                {props.tasks.map((task) => {

                    const editTaskTitle = (value: string) => {
                        props.editTaskTitle(value, task.id)
                    }

                    const onCrossClickHandler = () => {
                        props.removeTask(props.todolistID, task.id)
                    }

                    const changeTaskStatusHandler = () => {
                        props.changeTaskStatus(props.todolistID, task.id, task.isDone)
                    }

                    return <div key={task.id} className={task.isDone ? 'is-done' : ''}>
                    <Checkbox color='primary' checked={task.isDone} onChange={changeTaskStatusHandler}/>
                    <EditableSpan title={task.title} editTaskTitle={editTaskTitle}/>
                    <IconButton onClick={onCrossClickHandler}>
                        <Delete />
                    </IconButton>
                    </div>            
                })}
            <div>
                <Button color='default' variant={props.filter === 'all' ? 'outlined' : 'text'} onClick={onAllClickHandler}>All</Button>
                <Button color='primary' variant={props.filter === 'active' ? 'outlined' : 'text'} onClick={onActiveClickHandler}>Active</Button>
                <Button color='secondary' variant={props.filter === 'complited' ? 'outlined' : 'text'} onClick={onComplitedClickHandler}>Completed</Button>
            </div>
        </div>
    )
}

export default TodoList
