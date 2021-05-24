import React, { useEffect } from 'react';
import './App.css';
import Header from '../components/Header';
import { Container, Grid } from '@material-ui/core';
import Todolists from '../pages/todolists/Todolists';
import ErrorSnackBar from '../components/ErrorSnackBar/ErrorSnackBar';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from '../state/store';
import { StatusType } from '../state/app-reducer';
import ProgressLine from '../components/ProgressLine/ProgressLine';
import { HashRouter as Router, Route } from 'react-router-dom';
import Login from '../pages/Login/Login';
import CircularPreloader from '../components/CircularPreloader/CircularPreloader';
import { appInizializedTC } from '../state/app-reducer'


const App = () => {

  const dispatch = useDispatch()

  const status = useSelector<AppRootState, StatusType>((state) => state.app.status)
  const isInicialized = useSelector<AppRootState, Boolean>((state) => state.app.isInicialized)

  useEffect(() => {
      dispatch(appInizializedTC())
  }, [])

  if(!isInicialized){
    return <CircularPreloader />
  }

  return (
    <div>
      <Router>
        <Header />
        {status === 'loading' && <ProgressLine />}
          <Container fixed>
            <Route exact path='/' render={() => <Todolists />}/> 
          </Container>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '90vh' }}
          >
            <Route path='/login' render={() => <Login />}/>
          </Grid>
          <ErrorSnackBar />
      </Router>
    </div>
  );
}

export default App;
