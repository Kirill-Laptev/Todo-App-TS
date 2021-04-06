import React, { useCallback } from 'react'
import EditableSpan from '../../../../components/EditableSpan/EditableSpan'
import { Checkbox, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { TaskItemType, TaskStasuses } from '../../../../api/todolists-api'

export type TaskPropsType = {
    changeTaskTitle: (todoListId: string, taskID: string, title: string) => void
    removeTask: (id: string, todoListId: string) => void
    changeTaskStatus: (taskID: string, todoListId: string, status: TaskStasuses) => void
    task: TaskItemType
    todoListId: string
}

const Task: React.FC<TaskPropsType> = (props) => {

    const changeTaskTitle = useCallback((value: string) => { props.changeTaskTitle(props.todoListId, props.task.id, value)}, [props.changeTaskTitle, props.todoListId, props.task.id])

    const onCrossClickHandler = useCallback(() => {props.removeTask(props.todoListId, props.task.id)}, [props.removeTask, props.todoListId, props.task.id])

    const changeTaskStatusHandler = useCallback(() => {
        props.changeTaskStatus(props.todoListId, props.task.id, props.task.status === TaskStasuses.Completed ? TaskStasuses.New : TaskStasuses.Completed)
    }, [props.changeTaskStatus, props.todoListId, props.task.id, props.task.status])

    return <div key={props.task.id} className={props.task.status === TaskStasuses.Completed ? 'is-done' : ''}>
        <Checkbox 
        color='primary' 
        checked={props.task.status === TaskStasuses.Completed} 
        onChange={changeTaskStatusHandler}/>
        <EditableSpan title={props.task.title} changeItemTitle={changeTaskTitle}/>
        <IconButton onClick={onCrossClickHandler}>
            <Delete />
        </IconButton>
    </div>            
}

export default React.memo(Task)