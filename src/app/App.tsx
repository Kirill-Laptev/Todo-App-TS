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



const AppWithRedux = () => {

  const status = useSelector<AppRootState, StatusType>((state) => state.app.status)

  return (
    <div>
      <Header />
      {status === 'loading' && <ProgressLine />}
        <Container fixed>
          <Todolists />
        </Container>
        <ErrorSnackBar />
    </div>
  );
}

export default AppWithRedux;
