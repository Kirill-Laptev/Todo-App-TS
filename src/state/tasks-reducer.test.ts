import { TaskPriorities } from './../api/todolists-api';
import { addTodolistAC, removeTodolistAC } from './todolists-reducer';
import { removeTaskAC, tasksReducer, addTaskAC, changeTaskStatusAC, changeTaskTitleAC } from './tasks-reducer';
import { TasksStateType } from '../AppWithRedux';
import { TaskStasuses } from '../api/todolists-api';

let startState: TasksStateType;

beforeEach(() => {
  startState = {
    'todolistID1': [
      {id: '1', todolistID: 'todolistID1', title: 'JS', status: TaskStasuses.Completed, description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
      {id: '2', todolistID: 'todolistID1', title: 'ReactJS', status: TaskStasuses.Completed, description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
      {id: '3', todolistID: 'todolistID1', title: 'ExpressJS',  status: TaskStasuses.New, description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
      {id: '4', todolistID: 'todolistID1', title: 'Typescript', status: TaskStasuses.New, description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
      {id: '5', todolistID: 'todolistID1', title: 'HTML/CSS', status: TaskStasuses.Completed, description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}],
      'todolistID2': [
        {id: '1',todolistID: 'todolistID2', title: 'Milk', status: TaskStasuses.New, description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
        {id: '2',todolistID: 'todolistID2', title: 'Book', status: TaskStasuses.Completed, description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
        {id: '3',todolistID: 'todolistID2', title: 'Food for cat', status: TaskStasuses.New, description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }]
  }
})

test('correct task should be deleted from correct array', () => {

      const action = removeTaskAC('todolistID1', '1')

      const endState = tasksReducer(startState, action)

      expect(endState['todolistID1'].length).toBe(4)
      expect(endState['todolistID1'].every((task) => task.id !== '1')).toBeTruthy()
      expect(endState).toEqual({
        'todolistID1': [
          {id: '2', title: 'ReactJS', isDone: true},
          {id: '3', title: 'ExpressJS', isDone: false},
          {id: '4', title: 'Typescript', isDone: false},
          {id: '5', title: 'HTML/CSS', isDone: true}],
          'todolistID2': [
            {id: '1', title: 'Milk', isDone: false},
            {id: '2', title: 'Book', isDone: true},
            {id: '3', title: 'Food for cat', isDone: false}]
      })
})



test('correct task should be added to correct array', () => {
 
    const action = addTaskAC("Juice", "todolistID2");
 
    const endState = tasksReducer(startState, action)
 
    expect(endState["todolistID1"].length).toBe(5);
    expect(endState["todolistID2"].length).toBe(4);
    expect(endState["todolistID2"][0].id).toBeDefined();
    expect(endState["todolistID2"][0].title).toBe('Juice');
    expect(endState["todolistID2"][0].status).toBe(TaskStasuses.New);
})



test('status of specified task should be changed', () => {
 
    const action = changeTaskStatusAC("todolistID2", "2", TaskStasuses.New);
 
    const endState = tasksReducer(startState, action)
 
    expect(endState["todolistID2"][1].status).toBe(TaskStasuses.New);
  });
 

  test('title task should be changed', () => {
 
    const action = changeTaskTitleAC("todolistID2", "2", "Notebook");
 
    const endState = tasksReducer(startState, action)
 
    expect(endState["todolistID2"][1].title).toBe("Notebook");
  });



  test('new array should be added when new todolist is added', () => {
  
    const action = addTodolistAC("new todolist");
 
    const endState = tasksReducer(startState, action)
 
 
    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistID1" && k != "todolistID2");
    if (!newKey) {
        throw Error("new key should be added")
    }
 
    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
 });
 


 test('property with todolistId should be deleted', () => {

  const action = removeTodolistAC("todolistID2");

  const endState = tasksReducer(startState, action)


  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistID2"]).toBeUndefined();
});
