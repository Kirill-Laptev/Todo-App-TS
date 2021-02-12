import React from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import s from './components/TodoList/TodoList.module.css'
import {v1} from 'uuid' 

export type FilterValuesType = 'all' | 'active' | 'complited'

type TodolistsType = {
  id: string
  title: string
  filter: FilterValuesType
}

const App = () => {

  const todolistID1 = v1()
  const todolistID2 = v1()

  const [tasksObj, setTasks] = React.useState({
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

  // const changeTaskStatus = (taskID: string) => {
  //   const copyTasks = [...tasks]
  //   let task = copyTasks.find((task) => task.id === taskID)
  //   if(task){
  //     task.isDone = !task.isDone
  //   }
  //   setTasks([...copyTasks])          // Здесь все-равно делается поверхностное копирование
  // }


  // const changeTaskStatus = (taskID: string) => {
  //   const copyTasks = [...tasks]
  //   const indexCheckbox = copyTasks.findIndex((obj) => obj.id === taskID)
  //   const newArr = copyTasks.map((task, index) => {
  //     if(indexCheckbox === index){
  //       return {...task, isDone: !task.isDone}
  //     }
  //     return task
  //   }) 

  //   console.log(tasks)
  //   console.log(newArr)
  //   setTasks(newArr)          // Получилось сделать иммутабельно !!!
  // }                           

  

  return (
    <div className={s.app}>
      {todolists.map((tl) => {

        let tasksForTodolist = tasksObj[tl.id];

        if(tl.filter === 'active'){
          tasksForTodolist = tasksForTodolist.filter((task) => task.isDone === false)
        }

        if(tl.filter === 'complited'){
          tasksForTodolist = tasksForTodolist.filter((task) => task.isDone === true)
        }

        return <TodoList 
        key={tl.id}
        id={tl.id}
        title={tl.title} 
        tasks={tasksForTodolist} 
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={changeTaskStatus}
        filter={tl.filter}
        removeTodolist={removeTodolist}/>
      })}
    </div>
  );
}

export default App;
