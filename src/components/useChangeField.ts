import { useForm } from 'react-final-form';

function useChangeField<FormValues = Record<string, any>>(
  name: keyof FormValues
) {
  const form = useForm<FormValues>('useChangeField');

  return (value: FormValues[keyof FormValues]) => {
    form.change(name, value);
  };
}

export { useChangeField };
