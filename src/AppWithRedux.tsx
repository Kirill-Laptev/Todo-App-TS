import React from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import s from './components/TodoList/TodoList.module.css'
import AddItemForm from './components/TodoList/AddItemForm';
import Header from './components/Header';
import { Container, Grid, Paper } from '@material-ui/core';
import { changeTodolistFilterAC, removeTodolistAC, addTodolistAC } from './state/todolists-reducer';
import { addTaskAC, removeTaskAC, changeTaskStatusAC, changeTaskTitleAC } from './state/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from './state/store';

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

const AppWithRedux = () => {

  const dispatch = useDispatch()
  const todolists = useSelector<AppRootState, Array<TodolistsType>>((state) => state.todolists)
  const tasks = useSelector<AppRootState, TasksStateType>((state) => state.tasks)

  
  const removeTask = (todolistID: string, taskID: string) => {
    dispatch(removeTaskAC(todolistID, taskID))
  }
  
  const changeFilter = (filter: FilterValuesType, todolistID: string) => {
    dispatch(changeTodolistFilterAC(filter, todolistID))
  }

  const addTask = (title: string, todolistID: string) => {
    dispatch(addTaskAC(title, todolistID))
  }

  const changeTaskStatus = (taskID: string, todolistID: string, isDone: boolean) => {
    dispatch(changeTaskStatusAC(taskID, todolistID, isDone))   
  }                             

  const removeTodolist = (todolistID: string) => {
    dispatch(removeTodolistAC(todolistID))
  }

  const addNewTodolist = (newTitle: string) => {
    dispatch(addTodolistAC(newTitle))
  }

  const changeTaskTitle = (todolistID: string, taskID: string, title: string) => {
    dispatch(changeTaskTitleAC(todolistID, taskID, title))
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

export default AppWithRedux;
