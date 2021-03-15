import React, { useCallback } from 'react'
import s from './TodoList.module.css'
import { FilterValuesType, TaskType } from '../../AppWithRedux'
import { AddItemForm } from './AddItemForm'
import { Button, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import Task from './Task'


type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistID: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTask: (value: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, todolistID: string, isDone: boolean) => void
    changeTaskTitle: (todolistID: string, taskID: string, title: string) => void
    filter: FilterValuesType
    todolistID: string
    removeTodolist: (todolistID: string) => void
}

const TodoList: React.FC<PropsType> = (props) => {

    const onRemoveTodolist = useCallback(() => { props.removeTodolist(props.todolistID)}, [props.changeFilter, props.todolistID])

    const onAllClickHandler = useCallback(() => { props.changeFilter('all', props.todolistID)}, [props.changeFilter, props.todolistID])
   
    const onActiveClickHandler = useCallback(() => { props.changeFilter('active', props.todolistID)}, [props.changeFilter, props.todolistID])
    
    const onComplitedClickHandler = useCallback(() => { props.changeFilter('complited', props.todolistID)}, [props.changeFilter, props.todolistID])

    const addTask = React.useCallback((inputValue: string) => { props.addTask(inputValue, props.todolistID)}, [props.addTask, props.todolistID])


    let tasks = props.tasks

    if(props.filter === 'active'){
        tasks = tasks.filter((task) => task.isDone === false)
      }

      if(props.filter === 'complited'){
        tasks = tasks.filter((task) => task.isDone === true)
      }


    return (
        <div className={s.todolist__block}>
            <span className={s.todolist__name}>{props.title}</span>
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





