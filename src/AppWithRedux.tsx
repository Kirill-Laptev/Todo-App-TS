import React, { useCallback, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import s from './components/TodoList/TodoList.module.css'
import Header from './components/Header';
import AddItemForm from './components/TodoList/AddItemForm';
import { Container, Grid, Paper } from '@material-ui/core';
import { changeTodolistFilterAC, removeTodolistAC, addTodolistAC, changeTodolistTitleAC, TodolistDomainType, FilterValuesType, setTodolistsAC, fetchTodolistsTC, deleteTodolistTC, createTodolistTC, updateTodolistTitleTC } from './state/todolists-reducer';
import { updateTaskAC, changeTaskTitleAC, removeTaskTC, AddTaskTC, updateTaskTC } from './state/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from './state/store';
import { TaskItemType, TaskStasuses, todolistsAPI } from './api/todolists-api';



export type TasksStateType = {
  [key: string]: Array<TaskItemType>
}

const AppWithRedux = () => {


  const dispatch = useDispatch()
  const todolists = useSelector<AppRootState, Array<TodolistDomainType>>((state) => state.todolists)
  const tasks = useSelector<AppRootState, TasksStateType>((state) => state.tasks)

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])

  
  const removeTask = useCallback((todoListId: string, taskID: string) => {
    dispatch(removeTaskTC(todoListId, taskID))    
  }, [dispatch])
  
  const changeFilter = useCallback((filter: FilterValuesType, todoListId: string) => {
    dispatch(changeTodolistFilterAC(filter, todoListId))
  }, [dispatch])

  const addTask = useCallback((todoListId: string, title: string) => {
    dispatch(AddTaskTC(todoListId, title))
  }, [dispatch])

  const changeTaskStatus = useCallback((todoListId: string, taskID: string, status: TaskStasuses) => {
    dispatch(updateTaskTC(todoListId, taskID, {status})) 
  }, [dispatch])                           

  const removeTodolist = useCallback((todoListId: string) => {
    dispatch(deleteTodolistTC(todoListId))
  }, [dispatch])

  const addNewTodolist = useCallback((newTitle: string) => {
    dispatch(createTodolistTC(newTitle))
  }, [dispatch])

  const changeTaskTitle = useCallback((todoListId: string, taskID: string, title: string) => {
    dispatch(updateTaskTC(todoListId, taskID, {title}))
  }, [dispatch])
  
  const changeTodolistTitle = useCallback((todoListId: string, title: string) => {
    dispatch(updateTodolistTitleTC(todoListId, title))
  }, [dispatch])


  return (
    <div className={s.app}>
      
      <Header />

      <Container fixed>
      <Grid container style={{padding: '20px 20px 20px 0'}}>
        <AddItemForm addItem={addNewTodolist}/>
      </Grid>
      <Grid container spacing={3}>
      {todolists.map((tl) => {

        let tasksForTodolist = tasks[tl.id];

        return <Grid key={tl.id} item>
          <Paper style={{padding: '10px'}}>
            <TodoList 
              todoListId={tl.id}
              title={tl.title} 
              tasks={tasksForTodolist} 
              removeTask={removeTask}
              changeFilter={changeFilter}
              changeTaskTitle={changeTaskTitle}
              changeTodolistTitle={changeTodolistTitle}
              addTask={addTask}
              changeTaskStatus={changeTaskStatus}
              filter={tl.filter}
              removeTodolist={removeTodolist} />
          </Paper>
        </Grid>
      })}
      </Grid>
      </Container>
    </div>
  );
}

export default AppWithRedux;
