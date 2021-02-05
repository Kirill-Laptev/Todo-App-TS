import React from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import s from './components/TodoList/TodoList.module.css'

export type FilterValuesType = 'all' | 'active' | 'complited'

const App = () => {

  const [tasks, setTasks] = React.useState([
    {id: 0, title: 'JS', isDone: true},
    {id: 1, title: 'ReactJS', isDone: true},
    {id: 2, title: 'ExpressJS', isDone: false},
    {id: 3, title: 'Typescript', isDone: false}
  ])

  const [filter, setFilter] = React.useState<FilterValuesType>('all')

  let tasksForTodolist = tasks;

  if(filter === 'active'){
    tasksForTodolist = tasks.filter((task) => task.isDone === false)
  }

  if(filter === 'complited'){
    tasksForTodolist = tasks.filter((task) => task.isDone === true)
  }

  
  const removeTask = (id: number) => {
    const changedTasks = tasks.filter((task) => task.id !== id)
    setTasks(changedTasks)
  }
  
  const onChangeFilter = (value: FilterValuesType) => {
    setFilter(value)
  }

  return (
    <div className={s.app}>
      <TodoList 
      title='What to learn' 
      tasks={tasksForTodolist} 
      removeTask={removeTask}
      onChangeFilter={onChangeFilter}/>
    </div>
  );
}

export default App;
