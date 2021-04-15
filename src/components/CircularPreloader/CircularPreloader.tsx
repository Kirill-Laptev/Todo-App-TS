import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '38vh'
    },
    top: {
      color: 'primary',
      animationDuration: '550ms',
    },
    circle: {
      strokeLinecap: 'round',
    },
  }),
);

const CircularPreloader = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
        <CircularProgress
            variant="indeterminate"
            disableShrink
            className={classes.top}
            classes={{
            circle: classes.circle,
            }}
            size={80}
            thickness={4}
        />
        </div>
    )
}

export default CircularPreloader
