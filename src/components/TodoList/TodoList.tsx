import React, { useCallback, useEffect } from 'react'
import s from './TodoList.module.css'
import { AddItemForm } from './AddItemForm'
import { Button, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import Task from './Task'
import EditableSpan from './EditableSpan'
import { FilterValuesType } from '../../state/todolists-reducer'
import { TaskItemType, TaskStasuses, todolistsAPI } from '../../api/todolists-api'
import { setTasksAC } from '../../state/tasks-reducer'
import { useDispatch } from 'react-redux'


type PropsType = {
    title: string
    tasks: Array<TaskItemType>
    removeTask: (id: string, todolistID: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTask: (value: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, todolistID: string, status: TaskStasuses) => void
    changeTaskTitle: (todolistID: string, taskID: string, title: string) => void
    changeTodolistTitle: (todolistID: string, title: string) => void
    filter: FilterValuesType
    todolistID: string
    removeTodolist: (todolistID: string) => void
}

const TodoList: React.FC<PropsType> = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        todolistsAPI.getTasks(props.todolistID)
        .then((data) => {
            dispatch(setTasksAC(props.todolistID, data.items))
        })
    }, [])

    const onRemoveTodolist = useCallback(() => { props.removeTodolist(props.todolistID)}, [props.changeFilter, props.todolistID])

    const onAllClickHandler = useCallback(() => { props.changeFilter('all', props.todolistID)}, [props.changeFilter, props.todolistID])
   
    const onActiveClickHandler = useCallback(() => { props.changeFilter('active', props.todolistID)}, [props.changeFilter, props.todolistID])
    
    const onComplitedClickHandler = useCallback(() => { props.changeFilter('complited', props.todolistID)}, [props.changeFilter, props.todolistID])

    const addTask = useCallback((inputValue: string) => { props.addTask(inputValue, props.todolistID)}, [props.addTask, props.todolistID])

    const changeTodolistTitleHandler = useCallback((title: string) => { props.changeTodolistTitle(props.todolistID, title)}, [props.todolistID])

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
            <IconButton onClick={onRemoveTodolist}>
                <Delete />
            </IconButton>
            <AddItemForm addItem={addTask} />
            
                {tasks.map((task) => {
                    return <Task
                    key={task.id}
                    changeTaskTitle={props.changeTaskTitle}
                    removeTask={props.removeTask}
                    changeTaskStatus={props.changeTaskStatus}
                    task={task}
                    todolistID={props.todolistID}
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





