import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import Task, { TaskPropsType } from '../../components/TodoList/Task';
import { TaskPriorities, TaskStasuses } from '../../api/todolists-api';

export default {
    title: 'Task Component',
    component: Task
  } as Meta;

const removeTaskCallback = action('task removed')
const changeTaskTitleCallback = action('title changed')
const changeTaskStatusCallback = action('status changed')

const Template: Story<TaskPropsType> = (args) => {
    return <Task {...args} />
}

export const TaskExample = Template.bind({})
TaskExample.args = {
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskCallback,
    changeTaskStatus: changeTaskStatusCallback,
    task: {id: '1', todolistID: '1', title: 'new task', status: TaskStasuses.New,
    description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
}