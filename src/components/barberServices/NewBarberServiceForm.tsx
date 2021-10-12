import { Form, Formik } from 'formik';
import React from 'react';
import styled from 'styled-components/macro';
import { useCreateBarberServiceMutation } from '../../queries';
import { ActionButton } from '../common/ActionButton';
import TextInput from '../common/TextInput';

const InputContainer = styled.div`
  margin-bottom: 1em;
`;

interface NewBarberServiceFormValues {
  name: string;
  price: string;
  description: string;
}

export default function NewBarberServiceForm() {
  const initialValues: NewBarberServiceFormValues = {
    name: '',
    price: '',
    description: '',
  };

  const createBarberServiceMutation = useCreateBarberServiceMutation();

  const handleSubmit = (values: NewBarberServiceFormValues) => {
    createBarberServiceMutation.mutate({
      name: values.name,
      price: values.price,
      description: values.description,
    });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <InputContainer>
          <TextInput label="Name" name="name"></TextInput>
        </InputContainer>
        <InputContainer>
          <TextInput label="Price ($)" name="price"></TextInput>
        </InputContainer>
        <InputContainer>
          <TextInput label="Description" name="description"></TextInput>
        </InputContainer>
        <ActionButton type="submit">New Service</ActionButton>
      </Form>
    </Formik>
  );
}
