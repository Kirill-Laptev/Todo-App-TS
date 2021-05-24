import React from 'react'
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ErrorMessage, useFormik } from 'formik';
import { Button, Checkbox, FormControlLabel, FormGroup, Grid  } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { loginTC } from '../../state/auth-reducer';
import { AppRootState } from '../../state/store';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup'
import ViewError from '../../components/ViewMessage/ViewMessage';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: '300px'
    },
    input: {
        width: '100%'
    },
    inputWrapper: {
        position: 'relative',
        marginBottom: '20px'
    }
  }),
);

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('The field is required'),
    password: Yup.string().required('The field is required').max(50, 'Password should be less than 50 symbols')
})


const Login: React.FC = () => {

    const dispatch = useDispatch()

    const isLoggedIn = useSelector<AppRootState, boolean>((state) => state.auth.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: (values) => {
            dispatch(loginTC(values))
            console.log(formik.errors)
        },
        validationSchema: validationSchema
    })

    const classes = useStyles();

    if(isLoggedIn){
        return <Redirect to='/' />
    }

    return (
        <div>  
            
            <Grid container justify='center'>
                <form onSubmit={formik.handleSubmit} className={classes.root}>
                    <FormGroup>
                        <p>
                            To log in get registered <a href={'https://social-network.samuraijs.com/'}
                            target={'_blank'}>here</a>
                        </p>
                        <p>Or use common test account credentials:</p> 
                        <p>Email: free@samuraijs.com</p> 
                        <p>Password: free</p>
                    <div className={classes.inputWrapper}>
                        <TextField
                            id="standard-helperText"
                            className={classes.input}
                            label="Email"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.errors.email && formik.touched.email ? <ViewError error={formik.errors.email} /> : null}
                    </div>
                    <div className={classes.inputWrapper}>
                        <TextField
                            id="standard-helperText"
                            type='password'
                            className={classes.input}
                            label="Password"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.errors.password && formik.touched.password ? <ViewError error={formik.errors.password} /> : null}
                    </div>
                    <FormControlLabel 
                    label='Remember me'
                    control={
                        <Checkbox color="primary" {...formik.getFieldProps('rememberMe')}/>
                    }/>
                    <Button color="primary" variant="contained" type="submit">
                        Login
                    </Button>
                    </FormGroup>
                </form>
            </Grid>
        </div>
    )
}

export default Login
