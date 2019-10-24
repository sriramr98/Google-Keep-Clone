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
import SearchBar from 'components/App/SearchBar';
import InputModal from 'components/App/InputModal';
import {userActions} from 'containers/App/actions';
import {AUTH_TYPES} from 'utils/constants';

import ApplicationState from 'types/common/ApplicationState.type';
import AuthAction from 'types/auth/AuthAction.type';

function Home() {
  const dispatch = useDispatch();
  const [isAuthDialogOpen, setAuthDialogOpen] = useState(false);
  const [isInputOpen, setInputOpen] = useState(false);

  const firebaseUserActions = userActions<firebase.User>();
  const authActions = userActions<AuthAction>();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) dispatch(firebaseUserActions.success(user));
    });
    return () => unsubscribe();
  }, []);

  function toggleAuthDialogState() {
    setAuthDialogOpen(!isAuthDialogOpen);
  }

  function toggleInputModal() {
    setInputOpen(!isInputOpen);
  }

  const currentUser = useSelector(
    (state: ApplicationState) => state.app.currentUser
  );

  const isUserLoggedIn =
    !currentUser.isFetching &&
    currentUser.finished &&
    !currentUser.error &&
    currentUser.data;

  function toggleModal() {
    setInputOpen(open => !open);
  }

  function signOut() {
    dispatch(
      authActions.request({
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
      <Box mt={2}>
        <SearchBar onSearchBarClick={toggleModal} />
      </Box>
      {!isUserLoggedIn && (
        <Button onClick={() => toggleAuthDialogState()}>Login</Button>
      )}
      {isUserLoggedIn && <Button onClick={signOut}>Sign Out</Button>}
      <AuthDialog open={isAuthDialogOpen} handleClose={toggleAuthDialogState} />
      <InputModal open={isInputOpen} toggleModal={toggleInputModal} />
    </Box>
  );
}

export default Home;
