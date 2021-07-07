import * as React from 'react';
import { FieldRenderProps } from 'react-final-form';

import RenderCount from '../RenderCount';
import { composeEventHandlers } from '../utils';

interface TextInputProps extends FieldRenderProps<string> {
  placeholder: string;
}

const TextInput: React.FC<TextInputProps> = ({ input, meta, placeholder }) => {
  const initialValue = meta.initial ?? '';
  const valueRef = React.useRef<string>(initialValue);
  const [value, setValue] = React.useState(initialValue);

  // Update value from external
  React.useEffect(() => {
    if (valueRef.current !== input.value) {
      setValue(input.value);
    }
  }, [input.value]);

  const onChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    valueRef.current = value;
    setValue(value);
  };

  return (
    <div>
      <RenderCount />
      <label>First Name</label>
      <input
        {...input}
        value={value}
        onChange={composeEventHandlers(onChange, input.onChange)}
        placeholder={placeholder}
      />
      {meta.touched && meta.error && <span>{meta.error}</span>}
    </div>
  );
};

export { TextInput };
