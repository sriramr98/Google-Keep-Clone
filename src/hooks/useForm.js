import {useState} from 'react';

function useForm({initialState = {}, validationSchema, onSubmit}) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  function handleInputChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const isValid = await validateInput();
      if (isValid) {
        setErrors({});
        await onSubmit(values);
      }
    } catch (err) {
      setErrors({
        [err.path]: true,
        message: err.message || err.errors[0],
      });
    }
  }

  async function validateInput() {
    return validationSchema.validateSync(values);
  }

  return {
    values,
    errors,
    handleInputChange,
    handleSubmit,
  };
}

export default useForm;
