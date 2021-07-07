import * as React from 'react';

import { ComplexValueType } from '../form-data';
import { useChangeField } from './useChangeField';

interface OverrideValueProps {
  name: string;
  value: ComplexValueType;
}

export const OverrideValue: React.FC<OverrideValueProps> = ({
  name,
  value,
}) => {
  const changeField = useChangeField(name);

  return (
    <button
      onClick={(event) => {
        event.preventDefault();
        changeField(value);
      }}
    >
      Fill in Value
    </button>
  );
};
