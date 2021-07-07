import React from 'react';
import { render } from 'react-dom';
import Styles from './Styles';
import { Form, FormSpy } from 'react-final-form';

import RenderCount from './RenderCount';
import { TextInput } from './components/TextInput';
import { HookField } from './components/HookField';
import { SubField } from './components/SubField';
import { ComplexValueType, initialFormState } from './form-data';
import { OverrideValue } from './components/OverrideValue';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const onSubmit = async (values: any) => {
  await sleep(300);
  window.alert(JSON.stringify(values, null, 2));
};
const required = (value?: ComplexValueType) => (value ? undefined : 'Required');

const App = () => (
  <Styles>
    <h1>React Final Form Example</h1>
    <h2>Performance Optimization Through Subscriptions</h2>
    <a href="https://github.com/erikras/react-final-form#-react-final-form">
      Read Docs
    </a>
    <p>
      In this example, the numbers in the circles are the number of times that
      component has been rendered.
    </p>
    <p>
      The top form, with no specified subscription, rerenders the whole form and
      every input on every change.
    </p>
    <MyForm />
    <p>
      The bottom form subscribes only to the changes it needs to update. By not
      rerendering the whole form on every change, the fields, too, become
      independent. Notice that we must now use a <code>FormSpy</code> component
      to show the values in realtime.
    </p>
    <MyForm subscription={{ submitting: true, pristine: true }} />
  </Styles>
);

interface MyFormProps {
  subscription?: {
    submitting?: boolean;
    pristine?: boolean;
  };
}

const MyForm: React.FC<MyFormProps> = ({ subscription }) => (
  <Form
    initialValues={initialFormState}
    onSubmit={onSubmit}
    subscription={subscription}
    render={({ handleSubmit, form, submitting, pristine, values }) => (
      <form onSubmit={handleSubmit}>
        <RenderCount />

        <div>
          <OverrideValue
            name="firstName"
            value={{
              value: 'test',
            }}
          />
        </div>
        <HookField
          name="firstName"
          validate={required}
          placeholder="First Name"
          component={TextInput}
        />
        <SubField
          name="lastName"
          validate={required}
          placeholder="Last Name"
          component={TextInput}
        />

        <div className="buttons">
          <button type="submit" disabled={submitting}>
            Submit
          </button>
          <button
            type="button"
            onClick={form.reset}
            disabled={submitting || pristine}
          >
            Reset
          </button>
        </div>
        {values ? (
          <pre>
            <RenderCount />
            {JSON.stringify(values, null, 2)}
          </pre>
        ) : (
          <FormSpy subscription={{ values: true }}>
            {({ values }) => (
              <pre>
                <RenderCount />
                {JSON.stringify(values, null, 2)}
              </pre>
            )}
          </FormSpy>
        )}
      </form>
    )}
  />
);

render(<App />, document.getElementById('root'));
