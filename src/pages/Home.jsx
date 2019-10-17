import React, {useState, useEffect} from 'react';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import grey from '@material-ui/core/colors/grey';
import {useSelector, useDispatch} from 'react-redux';
import Button from '@material-ui/core/Button';
import firebase from 'firebase/app';

import AuthDialog from 'components/Common/AuthDialog';
import {incrementValue, decrementValue, userActions} from 'containers/App/actions';
import {AUTH_TYPES} from 'utils/constants';

function Home() {
  const dispatch = useDispatch();
  const [isAuthDialogOpen, setAuthDialogOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) dispatch(userActions.success(user));
    });
    return () => unsubscribe();
  }, [dispatch]);

  function toggleAuthDialogState() {
    setAuthDialogOpen(!isAuthDialogOpen);
  }

  const value = useSelector(state => state.app.value);
  const currentUser = useSelector(state => state.app.currentUser);

  const isUserLoggedIn =
    !currentUser.isFetching &&
    currentUser.finished &&
    !currentUser.error &&
    currentUser.data;

  function onSubtract() {
    dispatch(decrementValue());
  }

  function onAdd() {
    dispatch(incrementValue());
  }

  async function signOut() {
    dispatch(
      userActions.request({
        authType: AUTH_TYPES.LOGOUT,
      })
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      <Box
        bgcolor={grey[200]}
        py={4}
        mt={2}
        display="flex"
        width="20%"
        justifyContent="space-between"
        alignItems="center"
      >
        <IconButton onClick={onSubtract}>
          <RemoveIcon />
        </IconButton>
        <Typography variant="button" display="block">
          {value}
        </Typography>
        <IconButton onClick={onAdd}>
          <AddIcon />
        </IconButton>
      </Box>
      {!isUserLoggedIn && <Button onClick={() => toggleAuthDialogState()}>Login</Button>}
      {isUserLoggedIn && <Button onClick={signOut}>Sign Out</Button>}
      <AuthDialog open={isAuthDialogOpen} handleClose={toggleAuthDialogState} />
    </Box>
  );
}

export default Home;
