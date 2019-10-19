import UserInput from './UserInput.type';

interface AuthAction {
  authType: string;
  user?: UserInput
}

export default AuthAction;