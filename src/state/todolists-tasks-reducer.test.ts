import { addTodolistAC, todolistsReducer} from './todolists-reducer';
import { tasksReducer } from './tasks-reducer';
import { TasksStateType, TodolistsType } from '../App';

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}; // Пустой объект
    const startTodolistsState: Array<TodolistsType> = []; // Пустой массив
 
    const action = addTodolistAC("new todolist");
 
 	// Закидываем объект в один reducer, а массив в другой reducer
    const endTasksState = tasksReducer(startTasksState, action)  
    const endTodolistsState = todolistsReducer(startTodolistsState, action)
 
    const keys = Object.keys(endTasksState); // Получаем ключи, он там один единственный
    const idFromTasks = keys[0]; // Тут получаем ключ, который создался в нашем action creator
    const idFromTodolists = endTodolistsState[0].id;
 	
 	// Проверка на то что ключ (id) тасок - соответсвует тому, что сгенерирован в action creator
    expect(idFromTasks).toBe(action.todolistID);  
    // Проверка на то что ключ (id) созданного тудулиста (он там единственный), соотвествует id созданному в action creator
    expect(idFromTodolists).toBe(action.todolistID);
 });
 