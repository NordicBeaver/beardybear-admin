import { Form, Formik } from 'formik';
import React from 'react';
import styled from 'styled-components/macro';
import { useCreateBarberServiceMutation } from '../../queries';
import { Button } from '../common/Button';
import TextInput from '../common/TextInput';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

const InputContainer = styled.div`
  margin-bottom: 1em;
`;

interface NewBarberServiceFormValues {
  name: string;
  price: string;
  description: string;
}

export default function NewBarberServiceForm() {
  const history = useHistory();

  const initialValues: NewBarberServiceFormValues = {
    name: '',
    price: '',
    description: '',
  };

  const validationSchema: Yup.SchemaOf<NewBarberServiceFormValues> = Yup.object({
    name: Yup.string().required('Name cannot be empty'),
    price: Yup.string()
      .required('Price cannot be empty')
      .matches(/^\d+(\.\d+)?$/, 'Price should be a number.'),
    description: Yup.string().required('Description cannot be empty'),
  });

  const createBarberServiceMutation = useCreateBarberServiceMutation();

  const handleSubmit = async (values: NewBarberServiceFormValues) => {
    await createBarberServiceMutation.mutateAsync({
      name: values.name,
      price: values.price,
      description: values.description,
    });

    history.push('/services');
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
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
        <Button type="submit" variant="action">
          New Service
        </Button>
      </Form>
    </Formik>
  );
}
