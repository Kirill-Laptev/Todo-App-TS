import React from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import s from './components/TodoList/TodoList.module.css'
import {v1} from 'uuid' 
import AddItemForm from './components/TodoList/AddItemForm';

export type FilterValuesType = 'all' | 'active' | 'complited'

type TodolistsType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type TasksStateType = {
  [key: string]: Array<TaskType>
}

const App = () => {

  const todolistID1 = v1()
  const todolistID2 = v1()

  const [tasksObj, setTasks] = React.useState<TasksStateType>({
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

  const [todolists, setTodolists] = React.useState<Array<TodolistsType>>([
      {id: todolistID1, title: 'What to learn', filter: 'all'},
      {id: todolistID2, title: 'What to buy', filter: 'active'}
  ])  


  
  const removeTask = (id: string, todolistID: string) => {
      const tasksTodolist = tasksObj[todolistID]
      const filtredTasks = tasksTodolist.filter((task) => task.id !== id)
      tasksObj[todolistID] = filtredTasks
      setTasks({...tasksObj})
  }
  
  const changeFilter = (value: FilterValuesType, todolistID: string) => {
    const todolist = todolists.find((tl) => tl.id === todolistID)
    if(todolist){
      todolist.filter = value;
      setTodolists([...todolists])
    }
  }

  const addTask = (value: string, todolistID: string) => {
    const tasksTodolist = tasksObj[todolistID] 
    const newTask = {id: v1(), title: value, isDone: false}
    tasksObj[todolistID] = [newTask, ...tasksTodolist]
    setTasks({...tasksObj})
  }

  const changeTaskStatus = (taskID: string, todolistID: string) => {
    const tasksTodolist = tasksObj[todolistID]
    const task = tasksTodolist.find((task) => task.id === taskID)
    if(task){
      task.isDone = !task.isDone  // Не по правилам иммутабельности
      setTasks({...tasksObj})     // Но пока в уроках мы будем нарушать этот принцип.
    }      
  }                             

  const removeTodolist = (todolistID: string) => {
    const filtredTodolist = todolists.filter((tl) => tl.id !== todolistID)
    setTodolists(filtredTodolist)
  
    // Удаляем из ассоциативного массива данные с тасками для удаленного тудулиста
  
    delete tasksObj[todolistID]
    setTasks({...tasksObj})
  }

  const addNewTodolist = (title: string) => {
    const newTodoList: TodolistsType = {id: v1(), title: title, filter: 'all'}
    setTodolists([newTodoList, ...todolists])
    setTasks({...tasksObj, [newTodoList.id]: []})  // Добавляем для нового тудулиста пустой массив
  }

  const changeTaskTitle = (value: string, taskID: string, todolistID: string) => {
    const tasksTodolist = tasksObj[todolistID]
    const task = tasksTodolist.find((task) => task.id === taskID)
    if(task){
      debugger
      task.title = value
      setTasks({...tasksObj})
    }
  }
  


  return (
    <div className={s.app}>
      <AddItemForm addItem={addNewTodolist}/>
      {todolists.map((tl) => {

        let tasksForTodolist = tasksObj[tl.id];

        if(tl.filter === 'active'){
          tasksForTodolist = tasksForTodolist.filter((task) => task.isDone === false)
        }

        if(tl.filter === 'complited'){
          tasksForTodolist = tasksForTodolist.filter((task) => task.isDone === true)
        }

        const editTaskTitle = (value: string, taskID: string) => {
          changeTaskTitle(value, taskID, tl.id)
        }


        return <TodoList 
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
      })}
    </div>
  );
}

export default App;
