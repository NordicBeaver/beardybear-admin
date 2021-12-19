import React from 'react';
import { useHistory } from 'react-router';
import { useCreateUserMutation, useGetUserRolesQuery } from '../../queries';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import TextInput from '../common/TextInput';
import { Button } from '../common/Button';
import styled from 'styled-components/macro';
import Dropdown, { Option } from '../common/Dropdown';

const InputContainer = styled.div`
  margin-bottom: 2em;
`;

interface NewUserFormValues {
  name: string;
  password: string;
  role: string;
}

export default function NewUserForm() {
  const createUserMutation = useCreateUserMutation();

  const userRolesQuery = useGetUserRolesQuery();

  const history = useHistory();

  if (userRolesQuery.status !== 'success') {
    return <p>Loading...</p>;
  }
  const userRoles = userRolesQuery.data;

  const initialValues: NewUserFormValues = {
    name: '',
    password: '',
    role: userRoles[0],
  };

  const validationSchema: Yup.SchemaOf<NewUserFormValues> = Yup.object({
    name: Yup.string().required('Please enter username.'),
    password: Yup.string().required('Please enter password.'),
    role: Yup.string().required(),
  });

  const handleSubmit = async (values: NewUserFormValues) => {
    await createUserMutation.mutateAsync({
      name: values.name,
      password: values.password,
      role: values.role,
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
        <InputContainer>
          <Dropdown label="Role" name="role">
            {userRoles.map((role) => (
              <Option value={role}>{role}</Option>
            ))}
          </Dropdown>
        </InputContainer>
        <Button type="submit" variant="action">
          New User
        </Button>
      </Form>
    </Formik>
  );
}
