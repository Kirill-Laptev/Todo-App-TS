import React, { useCallback, useEffect } from 'react'
import s from './TodoList.module.css'
import { AddItemForm } from '../../../components/AddItemForm/AddItemForm'
import { Button, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import Task from './Task/Task'
import EditableSpan from '../../../components/EditableSpan/EditableSpan'
import { FilterValuesType } from '../../../state/todolists-reducer'
import { TaskItemType, TaskStasuses, todolistsAPI } from '../../../api/todolists-api'
import { fetchTasksTC, setTasksAC } from '../../../state/tasks-reducer'
import { useDispatch } from 'react-redux'
import { StatusType } from '../../../state/app-reducer'


type PropsType = {
    title: string
    disabled: boolean
    tasks: Array<TaskItemType>
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (todoListId: string, value: string,) => void
    changeTaskStatus: (taskID: string, todoListId: string, status: TaskStasuses) => void
    changeTaskTitle: (todoListId: string, taskID: string, title: string) => void
    changeTodolistTitle: (todoListId: string, title: string) => void
    filter: FilterValuesType
    todoListId: string
    removeTodolist: (todoListId: string) => void
}

const TodoList: React.FC<PropsType> = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(props.todoListId))
    }, [])

    const onRemoveTodolist = useCallback(() => { props.removeTodolist(props.todoListId)}, [props.changeFilter, props.todoListId])

    const onAllClickHandler = useCallback(() => { props.changeFilter('all', props.todoListId)}, [props.changeFilter, props.todoListId])
   
    const onActiveClickHandler = useCallback(() => { props.changeFilter('active', props.todoListId)}, [props.changeFilter, props.todoListId])
    
    const onComplitedClickHandler = useCallback(() => { props.changeFilter('complited', props.todoListId)}, [props.changeFilter, props.todoListId])

    const addTask = useCallback((inputValue: string) => { props.addTask(props.todoListId, inputValue)}, [props.addTask, props.todoListId])

    const changeTodolistTitleHandler = useCallback((title: string) => { props.changeTodolistTitle(props.todoListId, title)}, [props.todoListId])

    let tasks = props.tasks

    if(props.filter === 'active'){
        tasks = tasks.filter((task) => task.status === TaskStasuses.New)
      }

      if(props.filter === 'complited'){
        tasks = tasks.filter((task) => task.status === TaskStasuses.Completed)
      }


    return (
        <div className={s.todolist__block}>
            <EditableSpan title={props.title} changeItemTitle={changeTodolistTitleHandler}/>
            <IconButton disabled={props.disabled} onClick={onRemoveTodolist}>
                <Delete />
            </IconButton>
            <AddItemForm disabled={props.disabled} addItem={addTask} />
            
                {tasks.map((task) => {
                    return <Task
                    key={task.id}
                    changeTaskTitle={props.changeTaskTitle}
                    removeTask={props.removeTask}
                    changeTaskStatus={props.changeTaskStatus}
                    task={task}
                    todoListId={props.todoListId}
                     />
                })}
            <div>
                <Button color='default' variant={props.filter === 'all' ? 'outlined' : 'text'} onClick={onAllClickHandler}>All</Button>
                <Button color='primary' variant={props.filter === 'active' ? 'outlined' : 'text'} onClick={onActiveClickHandler}>Active</Button>
                <Button color='secondary' variant={props.filter === 'complited' ? 'outlined' : 'text'} onClick={onComplitedClickHandler}>Completed</Button>
            </div>
        </div>
    )
}

export default React.memo(TodoList)





