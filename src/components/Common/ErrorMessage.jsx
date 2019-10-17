import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import ErrorIcon from '@material-ui/icons/ErrorOutline';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  errorIcon: {
    paddingRight: theme.spacing(1),
  },
}));

function ErrorMessage({message}) {
  const styles = useStyles();
  return (
    <Box
      display="flex"
      alignItems="center"
      padding={0.4}
      border={`1px solid ${red[500]}`}
      borderRadius={4}
      my={1}
      bgcolor={red[50]}
    >
      <ErrorIcon color="error" className={styles.errorIcon} />
      <Typography variant="caption" color="error">
        {message}
      </Typography>
    </Box>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
