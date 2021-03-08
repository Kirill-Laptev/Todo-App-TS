import { addTodolistAC, removeTodolistAC } from './todolists-reducer';
import { removeTaskAC, tasksReducer, addTaskAC, changeTaskStatusAC, changeTaskTitleAC } from './tasks-reducer';
import { TasksStateType } from './../App';


test('correct task should be deleted from correct array', () => {
    const startState: TasksStateType = {
        'todolistID1': [
          {id: '1', title: 'JS', isDone: true},
          {id: '2', title: 'ReactJS', isDone: true},
          {id: '3', title: 'ExpressJS', isDone: false},
          {id: '4', title: 'Typescript', isDone: false},
          {id: '5', title: 'HTML/CSS', isDone: true}],
          'todolistID2': [
            {id: '1', title: 'Milk', isDone: false},
            {id: '2', title: 'Book', isDone: true},
            {id: '3', title: 'Food for cat', isDone: false}]
      }

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
    const startState: TasksStateType = {
        'todolistID1': [
          {id: '1', title: 'JS', isDone: true},
          {id: '2', title: 'ReactJS', isDone: true},
          {id: '3', title: 'ExpressJS', isDone: false},
          {id: '4', title: 'Typescript', isDone: false},
          {id: '5', title: 'HTML/CSS', isDone: true}],
          'todolistID2': [
            {id: '1', title: 'Milk', isDone: false},
            {id: '2', title: 'Book', isDone: true},
            {id: '3', title: 'Food for cat', isDone: false}]
    }
 
    const action = addTaskAC("Juice", "todolistID2");
 
    const endState = tasksReducer(startState, action)
 
    expect(endState["todolistID1"].length).toBe(5);
    expect(endState["todolistID2"].length).toBe(4);
    expect(endState["todolistID2"][0].id).toBeDefined();
    expect(endState["todolistID2"][0].title).toBe('Juice');
    expect(endState["todolistID2"][0].isDone).toBe(false);
})



test('status of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todolistID1': [
          {id: '1', title: 'JS', isDone: true},
          {id: '2', title: 'ReactJS', isDone: true},
          {id: '3', title: 'ExpressJS', isDone: false},
          {id: '4', title: 'Typescript', isDone: false},
          {id: '5', title: 'HTML/CSS', isDone: true}],
          'todolistID2': [
            {id: '1', title: 'Milk', isDone: false},
            {id: '2', title: 'Book', isDone: true},
            {id: '3', title: 'Food for cat', isDone: false}]
    }
 
    const action = changeTaskStatusAC("todolistID2", "2", false);
 
    const endState = tasksReducer(startState, action)
 
    expect(endState["todolistID2"][1].isDone).toBe(false);
  });
 

  test('title task should be changed', () => {
    const startState: TasksStateType = {
        'todolistID1': [
          {id: '1', title: 'JS', isDone: true},
          {id: '2', title: 'ReactJS', isDone: true},
          {id: '3', title: 'ExpressJS', isDone: false},
          {id: '4', title: 'Typescript', isDone: false},
          {id: '5', title: 'HTML/CSS', isDone: true}],
          'todolistID2': [
            {id: '1', title: 'Milk', isDone: false},
            {id: '2', title: 'Book', isDone: true},
            {id: '3', title: 'Food for cat', isDone: false}]
    }
 
    const action = changeTaskTitleAC("todolistID2", "2", "Notebook");
 
    const endState = tasksReducer(startState, action)
 
    expect(endState["todolistID2"][1].title).toBe("Notebook");
  });



  test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
      'todolistID1': [
        {id: '1', title: 'JS', isDone: true},
        {id: '2', title: 'ReactJS', isDone: true},
        {id: '3', title: 'ExpressJS', isDone: false},
        {id: '4', title: 'Typescript', isDone: false},
        {id: '5', title: 'HTML/CSS', isDone: true}],
        'todolistID2': [
          {id: '1', title: 'Milk', isDone: false},
          {id: '2', title: 'Book', isDone: true},
          {id: '3', title: 'Food for cat', isDone: false}]
  }
  
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
  const startState: TasksStateType = {
    'todolistID1': [
      {id: '1', title: 'JS', isDone: true},
      {id: '2', title: 'ReactJS', isDone: true},
      {id: '3', title: 'ExpressJS', isDone: false},
      {id: '4', title: 'Typescript', isDone: false},
      {id: '5', title: 'HTML/CSS', isDone: true}],
      'todolistID2': [
        {id: '1', title: 'Milk', isDone: false},
        {id: '2', title: 'Book', isDone: true},
        {id: '3', title: 'Food for cat', isDone: false}]
}

  const action = removeTodolistAC("todolistID2");

  const endState = tasksReducer(startState, action)


  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistID2"]).toBeUndefined();
});
