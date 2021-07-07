import * as React from 'react';
import { FieldValidator } from 'final-form';
import {
  FieldRenderProps,
  FieldInputProps,
  FieldMetaState,
  useField,
} from 'react-final-form';

import { ComplexValueType } from '../form-data';

function filterValue(value?: ComplexValueType): string;
function filterValue(value?: undefined): undefined;
function filterValue(value?: ComplexValueType): string | undefined {
  return value ? value.value : undefined;
}

function convertInput(
  input: FieldInputProps<ComplexValueType>
): FieldInputProps<string> {
  return {
    ...input,
    onChange(event: React.ChangeEvent<HTMLInputElement>) {
      const value = event.target.value;
      input.onChange({ ...input.value, value });
    },
    value: filterValue(input.value),
  };
}

function convertMeta(
  meta: FieldMetaState<ComplexValueType>
): FieldMetaState<string> {
  return {
    ...meta,
    initial: filterValue(meta.initial),
  };
}

interface OtherComponentProps {
  placeholder: string;
}

interface ComponentProps
  extends FieldRenderProps<string>,
    OtherComponentProps {}

interface HookFieldProps extends OtherComponentProps {
  name: string;
  component: React.ElementType<ComponentProps>;
  validate: FieldValidator<ComplexValueType>;
}

const HookField: React.FC<HookFieldProps> = ({
  component: Component,
  name,
  validate,
  ...restProps
}) => {
  const { input, meta } = useField(name, { validate });

  const convertedInput = convertInput(input);
  const convertedMeta = convertMeta(meta);

  return (
    <Component input={convertedInput} meta={convertedMeta} {...restProps} />
  );
};

export { HookField };
