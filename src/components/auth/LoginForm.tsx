import { Form, Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import { login } from '../../api';
import { Button } from '../common/Button';
import TextInput from '../common/TextInput';
import { useAuth } from './AuthContext';
import * as Yup from 'yup';

const InputContainer = styled.div`
  margin-bottom: 2em;
`;

interface LoginFormValues {
  username: string;
  password: string;
}

export default function LoginForm() {
  const auth = useAuth()!;
  const history = useHistory();

  const initialValues: LoginFormValues = {
    username: '',
    password: '',
  };

  const validationSchema: Yup.SchemaOf<LoginFormValues> = Yup.object({
    username: Yup.string().required('Username cannot be empty'),
    password: Yup.string().required('Password cannot be empty'),
  });

  const handleSubmit = async (values: LoginFormValues) => {
    const token = await login({ username: values.username, password: values.password });
    if (token != null) {
      auth.login(token);
      history.push('/');
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form>
        <InputContainer>
          <TextInput label="Username" name="username"></TextInput>
        </InputContainer>
        <InputContainer>
          <TextInput label="Password" name="password"></TextInput>
        </InputContainer>
        <Button type="submit" variant="action">
          Login
        </Button>
      </Form>
    </Formik>
  );
}
