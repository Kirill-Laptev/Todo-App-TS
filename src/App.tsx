import React from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import s from './components/TodoList/TodoList.module.css'

const App = () => {

  const tasks1 = [
    {id: 0, title: 'HTML', isDone: true},
    {id: 1, title: 'CSS', isDone: true},
    {id: 2, title: 'JS', isDone: true},
  ]

  const tasks2 = [
    {id: 0, title: 'Watch film', isDone: true},
    {id: 1, title: 'Listen music', isDone: false},
    {id: 2, title: 'Ride on bycicle', isDone: true},
  ]

  return (
    <div className={s.app}>
      <TodoList title='What to learn' tasks={tasks1}/>
      <TodoList title='What to do today' tasks={tasks2}/>
    </div>
  );
}

export default App;
