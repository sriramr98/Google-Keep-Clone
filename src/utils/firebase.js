import firebase from 'firebase/app';
import 'firebase/auth';

export const getIdToken = async () => {
  try {
    const {currentUser} = firebase.auth();
    if (currentUser) {
      const idToken = await currentUser.getIdToken();
      return idToken;
    }
    return currentUser;
  } catch (error) {
    throw error || new Error('Error retrieving ID token');
  }
};

export const logout = async () => {
  try {
    await firebase.auth().signOut();
  } catch (error) {
    throw error || new Error('Error logging out');
  }
};

export const loginUser = async (email, password) => {
  try {
    const user = await firebase.auth().signInWithEmailAndPassword(email, password);
    return user;
  } catch (error) {
    let message = '';
    switch (error.code) {
      case 'auth/invalid-email':
        message = 'Invalid Email Id';
        break;
      case 'auth/user-disabled':
        message = 'User is temporarily disabled';
        break;
      case 'auth/user-not-found':
        message = 'User not found. Please register';
        break;
      case 'auth/wrong-password':
        message = 'Incorrect password';
        break;
      default:
        message = 'Error logging in';
        break;
    }
    throw new Error(message);
  }
};

export const registerUser = async (email, password) => {
  try {
    const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
    return user;
  } catch (error) {
    const errorCode = error.code;
    let message = '';
    switch (errorCode) {
      case 'auth/email-already-in-use':
        message = 'Email already in use';
        break;
      case 'auth/invalid-email':
        message = 'Invalid email ID';
        break;
      case 'auth/weak-password':
        message = 'Weak password';
        break;
      default:
        message = 'Error registering user';
        break;
    }
    throw new Error(message);
  }
};

export const signInWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  const scopes = ['profile', 'email'];
  scopes.forEach(scope => provider.addScope(scope));
  try {
    return await firebase.auth().signInWithPopup(provider);
  } catch (error) {
    let message = '';
    switch (error.code) {
      case 'auth/account-exists-with-different-credential':
        message = 'Account exists with another sign in type';
        break;
      case 'auth/popup-closed-by-user':
        message = 'Login popup closed';
        break;
      default:
        message = 'Error signing in';
        break;
    }
    throw new Error(message);
  }
};

export const isLoggedIn = () => {
  const {currentUser} = firebase.auth();
  return currentUser !== null;
};

export default firebase;
