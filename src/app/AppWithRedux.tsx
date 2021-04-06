import React from 'react';
import './App.css';
import Header from '../components/Header';
import { Container } from '@material-ui/core';
import Todolists from '../pages/todolists/Todolists';



const AppWithRedux = () => {

  return (
    <div>
      
      <Header />

      <Container fixed>
        <Todolists />
      </Container>
    </div>
  );
}

export default AppWithRedux;
