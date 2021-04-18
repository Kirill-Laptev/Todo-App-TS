import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logoutTC } from '../state/auth-reducer';
import { AppRootState } from '../state/store';

const Header = () => {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootState, boolean>((state) => state.auth.isLoggedIn)

    const onLogOutHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon/>
                    </IconButton>
                    {isLoggedIn && <Button onClick={onLogOutHandler} color="inherit">Log out</Button>}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header
