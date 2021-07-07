interface ComplexValueType {
  value: string;
}

interface FormState {
  firstName: ComplexValueType;
  lastName: ComplexValueType;
}

const initialFormState: FormState = {
  firstName: { value: '' },
  lastName: { value: '' },
};

export type { FormState, ComplexValueType };
export { initialFormState };
