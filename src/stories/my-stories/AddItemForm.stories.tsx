import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { AddItemForm, AddItemPropsType } from '../../components/AddItemForm/AddItemForm';
import { action } from '@storybook/addon-actions';

export default {
    title: 'AddItemForm Component',
    component: AddItemForm
  } as Meta;

const callback = action('Button "add" was pressed inside form')

const Template: Story<AddItemPropsType> = (args) => {
    return <AddItemForm {...args} />
}

export const AddItem = Template.bind({})
AddItem.args = {
    // addItem: (inputValue: string) => alert(inputValue)
    addItem: callback
}