import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import { useCreateFirstUserMutation } from '../../queries';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { ActionButton } from '../common/ActionButton';
import TextInput from '../common/TextInput';

const InputContainer = styled.div`
  margin-bottom: 2em;
`;

interface FirstUserFormValues {
  name: string;
  password: string;
}

export default function FirstUserForm() {
  const createFirstUserMutation = useCreateFirstUserMutation();

  const history = useHistory();

  const initialValues: FirstUserFormValues = {
    name: '',
    password: '',
  };

  const validationSchema: Yup.SchemaOf<FirstUserFormValues> = Yup.object({
    name: Yup.string().required('Please enter username.'),
    password: Yup.string().required('Please enter password.'),
  });

  const handleSubmit = async (values: FirstUserFormValues) => {
    await createFirstUserMutation.mutateAsync({
      name: values.name,
      password: values.password,
    });
    history.push('/login');
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form>
        <InputContainer>
          <TextInput label="Username" name="name"></TextInput>
        </InputContainer>
        <InputContainer>
          <TextInput label="Password" name="password"></TextInput>
        </InputContainer>
        <ActionButton type="submit">New User</ActionButton>
      </Form>
    </Formik>
  );
}
