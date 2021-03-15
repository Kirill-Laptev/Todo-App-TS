import React, { useCallback } from 'react'
import EditableSpan from './EditableSpan'
import { Checkbox, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { TaskType } from '../../AppWithRedux'

type TaskPropsType = {
    changeTaskTitle: (todolistID: string, taskID: string, title: string) => void
    removeTask: (id: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, todolistID: string, isDone: boolean) => void
    task: TaskType
    todolistID: string
}

const Task: React.FC<TaskPropsType> = (props) => {

    const changeTaskTitle = useCallback((value: string) => { props.changeTaskTitle(props.todolistID, props.task.id, value)}, [props.changeTaskTitle, props.todolistID, props.task.id])

    const onCrossClickHandler = useCallback(() => {props.removeTask(props.todolistID, props.task.id)}, [props.removeTask, props.todolistID, props.task.id])

    const changeTaskStatusHandler = useCallback(() => {props.changeTaskStatus(props.todolistID, props.task.id, props.task.isDone)}, [props.changeTaskStatus, props.todolistID, props.task.id, props.task.isDone])

    return <div key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
        <Checkbox color='primary' checked={props.task.isDone} onChange={changeTaskStatusHandler}/>
        <EditableSpan title={props.task.title} changeTaskTitle={changeTaskTitle}/>
        <IconButton onClick={onCrossClickHandler}>
            <Delete />
        </IconButton>
    </div>            
}

export default React.memo(Task)