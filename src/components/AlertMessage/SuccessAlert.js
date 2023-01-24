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

const SuccessAlert = ({message}) => {
    const classes = useStyles();

    return (
        <>
            {
                (message) ? (
                    <div className={classes.root}>
                        <Alert severity="success">
                            {message}
                        </Alert>
                    </div>
                ) : ('')
            }
        </>
    );
}

export default SuccessAlert;