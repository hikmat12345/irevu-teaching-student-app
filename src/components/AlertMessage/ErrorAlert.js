import React  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
}));

const ErrorAlert = ({message}) => {
    const classes = useStyles();
    
    return (
      <>
        {
            (message) ? (
                <div className={classes.root}>
                    <Alert severity="error">
                        {message}
                    </Alert>
                </div>
            ) : ('')
        }
      </>
    );
}

export default ErrorAlert;