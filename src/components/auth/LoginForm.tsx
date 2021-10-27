import { Form, Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import { ActionButton } from '../common/ActionButton';
import TextInput from '../common/TextInput';
import { useAuth } from './AuthContext';

const InputContainer = styled.div`
  margin-bottom: 2em;
`;

interface LoginFormValues {
  username: string;
  password: string;
}

export default function LoginForm() {
  const { login } = useAuth()!;
  const history = useHistory();

  const initialValues: LoginFormValues = {
    username: '',
    password: '',
  };

  const handleSubmit = async (values: LoginFormValues) => {
    await login('', '');
    history.push('/');
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <InputContainer>
          <TextInput label="Username" name="username"></TextInput>
        </InputContainer>
        <InputContainer>
          <TextInput label="Password" name="password"></TextInput>
        </InputContainer>
        <ActionButton type="submit">Login</ActionButton>
      </Form>
    </Formik>
  );
}
