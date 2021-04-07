import { TodolistType } from './../api/todolists-api';
import { addTodolistAC, TodolistDomainType, todolistsReducer} from './todolists-reducer';
import { tasksReducer } from './tasks-reducer';
import { TasksStateType } from '../state/tasks-reducer';

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}; // Пустой объект
    const startTodolistsState: Array<TodolistDomainType> = []; // Пустой массив

    const todolist = {
      id: 'todoListId3',
      addedDate: '',
      order: 0,
      title: 'new todolist'
    }
 
    const action = addTodolistAC(todolist);
 
 	// Закидываем объект в один reducer, а массив в другой reducer
    const endTasksState = tasksReducer(startTasksState, action)  
    const endTodolistsState = todolistsReducer(startTodolistsState, action)
 
    const keys = Object.keys(endTasksState); // Получаем ключи, он там один единственный
    const idFromTasks = keys[0]; // Тут получаем ключ, который создался в нашем action creator
    const idFromTodolists = endTodolistsState[0].id;
 	
 	
    expect(idFromTasks).toBe(action.todolist.id);  
    
    expect(idFromTodolists).toBe(action.todolist.id);
 });
 