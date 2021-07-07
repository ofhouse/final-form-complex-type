import * as React from 'react';
import { FieldValidator } from 'final-form';
import { FieldRenderProps, useField } from 'react-final-form';

import { ComplexValueType } from '../form-data';

interface OtherComponentProps {
  placeholder: string;
}

interface ComponentProps
  extends FieldRenderProps<string>,
    OtherComponentProps {}

interface SubFieldProps extends OtherComponentProps {
  name: string;
  component: React.ElementType<ComponentProps>;
  validate: FieldValidator<ComplexValueType>;
}

const SubField: React.FC<SubFieldProps> = ({
  component: Component,
  name,
  ...restProps
}) => {
  const { input, meta } = useField(`${name}.value`);

  return <Component input={input} meta={meta} {...restProps} />;
};

export { SubField };
