import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from '../../state/store';
import { setAppErrorAC } from '../../state/app-reducer';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ErrorSnackBar() {
  
  const dispatch = useDispatch()
  const error = useSelector((state: AppRootState) => state.app.error)  


  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(setAppErrorAC(null))
  };

  const isOpen = error !== null

  return (
    <div>
      <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="error" onClose={handleClose}>{error}</Alert>
      </Snackbar>
    </div>
  );
}

export default ErrorSnackBar