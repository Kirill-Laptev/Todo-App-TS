import React from 'react'
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import { Button, Checkbox, FormControlLabel, Grid  } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { loginTC } from '../../../state/auth-reducer';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: '300px',
    },
    input: {
        marginBottom: '20px'
    }
  }),
);


const Login: React.FC = () => {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: (values) => {
            dispatch(loginTC(values))
        }
    })

    const classes = useStyles();

    

    return (
        <div>  
            <Grid container justify='center'>
                <form onSubmit={formik.handleSubmit} className={classes.root}>
                    <TextField
                        id="standard-helperText"
                        className={classes.input}
                        label="Email"
                        {...formik.getFieldProps('email')}
                    />
                    <TextField
                        id="standard-helperText"
                        type='password'
                        className={classes.input}
                        label="Password"
                        {...formik.getFieldProps('password')}
                    />
                    <FormControlLabel 
                    label='Remember me'
                    control={
                        <Checkbox color="primary" {...formik.getFieldProps('rememberMe')}/>
                    }/>
                    <Button color="primary" variant="contained" type="submit">
                        Login
                    </Button>
                </form>
            </Grid>
        </div>
    )
}

export default Login
