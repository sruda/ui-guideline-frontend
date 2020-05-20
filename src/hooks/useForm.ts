import { useState, ChangeEvent, FormEvent } from 'react';

type UseFormResponse<T, P> = {
  values: T;
  errors: P;
  touchedValues: { [key: string]: boolean };
  handleChange: (event: HTMLAllInputElement) => void;
  handleBlur: (event: HTMLAllInputElement) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

type HTMLAllInputElement =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLTextAreaElement>
  | ChangeEvent<HTMLSelectElement>;

const useForm = <T, P>(initialValues: T, onSubmit, validateFunction): UseFormResponse<T, P> => {
  const [values, setValues] = useState(initialValues || ({} as T));
  const [touchedValues, setTouchedValues] = useState({});
  const [errors, setErrors] = useState({} as P);

  const handleChange = (event: HTMLAllInputElement): void => {
    event.persist();
    const target = event.target as HTMLInputElement & HTMLTextAreaElement;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setValues((values) => ({ ...values, [name]: value }));
  };

  const handleBlur = (event: HTMLAllInputElement): void => {
    const target = event.target;
    const name = target.name;
    setTouchedValues({
      ...touchedValues,
      [name]: true,
    });
    const newErrors = validateFunction(values);
    setErrors({ ...newErrors });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    if (event) event.preventDefault();
    const newErrors = validateFunction(values);
    setErrors({ ...newErrors });
    onSubmit(values, newErrors);
  };

  return {
    values,
    errors,
    touchedValues,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};

export default useForm;
