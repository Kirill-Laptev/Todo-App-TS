import React from 'react';
import './App.css';
import Header from '../components/Header';
import { Container } from '@material-ui/core';
import Todolists from '../pages/todolists/Todolists';
import ErrorSnackBar from '../components/ErrorSnackBar/ErrorSnackBar';
import { useSelector } from 'react-redux';
import { AppRootState } from '../state/store';
import { StatusType } from '../state/app-reducer';
import ProgressLine from '../components/ProgressLine/ProgressLine';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from '../pages/todolists/Login/Login';



const App = () => {

  const status = useSelector<AppRootState, StatusType>((state) => state.app.status)

  return (
    <div>
      <BrowserRouter>
        <Header />
        {status === 'loading' && <ProgressLine />}
          <Container fixed>
            <Route exact path='/' render={() => <Todolists />}/> 
            <Route path='/login' render={() => <Login />}/> 
          </Container>
          <ErrorSnackBar />
      </BrowserRouter>
    </div>
  );
}

export default App;
