import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import AppWithRedux from '../../app/App';
import { ReduxStoreProviderDecorator } from './ReduxStoreProviderDecorator';

export default {
    title: 'App Component',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
  } as Meta;

const Template = () => {
    return <AppWithRedux />
}

export const App = Template.bind({})