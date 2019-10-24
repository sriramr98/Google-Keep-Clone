import { useState } from 'react';
import * as Yup from 'yup';

import FormError from 'types/FormError.type';

interface FormParams<T extends object> {
  initialState: T;
  validationSchema?: Yup.ObjectSchema<T>;
  onSubmit?: (values: T) => void;
}

interface FormUtils<T extends object> {
  values: T;
  errors: FormError;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  cleanValues: () => void;
}

const useForm = <T extends object>({
  initialState,
  validationSchema,
  onSubmit,
}: FormParams<T>): FormUtils<T> => {
  const [values, setValues] = useState<T>(initialState);
  const [errors, setErrors] = useState<FormError>({ message: '' });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    try {
      const isValid = validateInput();
      if (isValid) {
        setErrors({ message: '' });
        if (onSubmit) onSubmit(values);
      }
    } catch (err) {
      setErrors({
        key: err.path,
        message: err.message || err.errors[0],
      });
    }
  }

  function validateInput() {
    if (validationSchema) return validationSchema.validateSync(values);
  }

  function cleanValues() {
    setValues(initialState);
  }

  return {
    values,
    errors,
    handleInputChange,
    handleSubmit,
    cleanValues,
  };
};

export default useForm;
