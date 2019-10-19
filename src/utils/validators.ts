import * as Yup from 'yup';

// NOTE: DO NOT CHANGE THE ORDER OF THE PROPERTIES. CHANGING THE ORDER WILL CHANGE -
// - THE ORDER OF ERRORS WHEN MORE THAN ONE FIELD FAILS VALIDATION

export const signInValidator = Yup.object().shape({
  password: Yup.string()
    .required('Password Required')
    .min(6, 'Password has to be atleast 6 characters'),
  email: Yup.string()
    .required('Email Required')
    .email('Need a valid email'),
});

export const signUpValidator = Yup.object().shape({
  password: Yup.string()
    .required('Password Required')
    .min(6, 'Password has to be atleast 6 characters'),
  email: Yup.string()
    .required('Email Required')
    .email('Need a valid email'),
  name: Yup.string()
    .min(3, 'Name has to be atleast 3 characters')
    .required('Name is required'),
});
