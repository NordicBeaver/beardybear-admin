import React from 'react';
import { useHistory } from 'react-router';
import { useCreateUserMutation } from '../../queries';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import TextInput from '../common/TextInput';
import { ActionButton } from '../common/ActionButton';
import styled from 'styled-components/macro';

const InputContainer = styled.div`
  margin-bottom: 2em;
`;

interface NewUserFormValues {
  name: string;
  password: string;
}

export default function NewUserForm() {
  const createUserMutation = useCreateUserMutation();

  const history = useHistory();

  const initialValues: NewUserFormValues = {
    name: '',
    password: '',
  };

  const validationSchema: Yup.SchemaOf<NewUserFormValues> = Yup.object({
    name: Yup.string().required('Please enter username.'),
    password: Yup.string().required('Please enter password.'),
  });

  const handleSubmit = async (values: NewUserFormValues) => {
    await createUserMutation.mutateAsync({
      name: values.name,
      password: values.password,
    });
    history.push('/users');
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
