import React from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import s from './components/TodoList/TodoList.module.css'
import {v1} from 'uuid' 
import AddItemForm from './components/TodoList/AddItemForm';
import Header from './components/Header';
import { Container, Grid, Paper } from '@material-ui/core';
import { changeTodolistFilterAC, removeTodolistAC, todolistsReducer, addTodolistAC } from './state/todolists-reducer';
import { addTaskAC, removeTaskAC, tasksReducer, changeTaskStatusAC, changeTaskTitleAC } from './state/tasks-reducer';

export type FilterValuesType = 'all' | 'active' | 'complited'

export type TodolistsType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

const AppWithReducers = () => {

  const todolistID1 = v1()
  const todolistID2 = v1()

  const [todolists, dispatchToTodolistsReducer] = React.useReducer(todolistsReducer ,[
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'}
])


const [tasks, dispatchToTasksReducer] = React.useReducer(tasksReducer, {
  [todolistID1]: [
    {id: v1(), title: 'JS', isDone: true},
    {id: v1(), title: 'ReactJS', isDone: true},
    {id: v1(), title: 'ExpressJS', isDone: false},
    {id: v1(), title: 'Typescript', isDone: false},
    {id: v1(), title: 'HTML/CSS', isDone: true}],
    [todolistID2]: [
      {id: v1(), title: 'Milk', isDone: false},
      {id: v1(), title: 'Book', isDone: true},
      {id: v1(), title: 'Food for cat', isDone: false}]
})

  
  const removeTask = (todolistID: string, taskID: string) => {
    dispatchToTasksReducer(removeTaskAC(todolistID, taskID))
  }
  
  const changeFilter = (filter: FilterValuesType, todolistID: string) => {
    dispatchToTodolistsReducer(changeTodolistFilterAC(filter, todolistID))
  }

  const addTask = (title: string, todolistID: string) => {
    dispatchToTasksReducer(addTaskAC(title, todolistID))
  }

  const changeTaskStatus = (taskID: string, todolistID: string, isDone: boolean) => {
    dispatchToTasksReducer(changeTaskStatusAC(taskID, todolistID, isDone))   
  }                             

  const removeTodolist = (todolistID: string) => {
    const action = removeTodolistAC(todolistID)

    dispatchToTodolistsReducer(action)
    dispatchToTasksReducer(action)
  }

  const addNewTodolist = (newTitle: string) => {
    const action = addTodolistAC(newTitle)

    dispatchToTodolistsReducer(action)
    dispatchToTasksReducer(action)
  }

  const changeTaskTitle = (todolistID: string, taskID: string, title: string) => {
    dispatchToTasksReducer(changeTaskTitleAC(todolistID, taskID, title))
  }
  


  return (
    <div className={s.app}>
      
      <Header />

      <Container fixed>
      <Grid container style={{padding: '20px 20px 20px 0'}}><AddItemForm addItem={addNewTodolist}/></Grid>
      <Grid container spacing={3}>
      {todolists.map((tl) => {

        let tasksForTodolist = tasks[tl.id];

        if(tl.filter === 'active'){
          tasksForTodolist = tasksForTodolist.filter((task) => task.isDone === false)
        }

        if(tl.filter === 'complited'){
          tasksForTodolist = tasksForTodolist.filter((task) => task.isDone === true)
        }

        const editTaskTitle = (value: string, taskID: string) => {
          changeTaskTitle(tl.id, taskID, value)
        }


        return <Grid item>
          <Paper style={{padding: '10px'}}>
            <TodoList 
              key={tl.id}
              todolistID={tl.id}
              title={tl.title} 
              tasks={tasksForTodolist} 
              removeTask={removeTask}
              changeFilter={changeFilter}
              addTask={addTask}
              changeTaskStatus={changeTaskStatus}
              filter={tl.filter}
              removeTodolist={removeTodolist}
              editTaskTitle={editTaskTitle}/>
          </Paper>
        </Grid>
      })}
      </Grid>
      </Container>
    </div>
  );
}

export default AppWithReducers;
