import { Form, Formik } from 'formik';
import React from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import * as Yup from 'yup';
import { barberServiceFromDto } from '../../domain/BarberService';
import { useGetBarberServiceQuery, useUpdateBarberServiceMutation } from '../../queries';
import { Button } from '../common/Button';
import TextInput from '../common/TextInput';

const InputContainer = styled.div`
  margin-bottom: 1em;
`;

interface UpdateBarberServiceFormValues {
  name: string;
  price: string;
  description: string;
}

export default function UpdateBarberServiceForm() {
  const { id: barberServiceidString } = useParams<{ id: string }>();
  const barberServiceId = parseInt(barberServiceidString);

  const history = useHistory();

  const barberServiceQuery = useGetBarberServiceQuery(barberServiceId);

  const updateBarberServiceMutation = useUpdateBarberServiceMutation();

  if (barberServiceQuery.status !== 'success') {
    return <p>Loading...</p>;
  }

  const barberService = barberServiceFromDto(barberServiceQuery.data);

  const initialValues: UpdateBarberServiceFormValues = {
    name: barberService.name,
    price: barberService.price.toFixed(2),
    description: barberService.description,
  };

  const validationSchema: Yup.SchemaOf<UpdateBarberServiceFormValues> = Yup.object({
    name: Yup.string().required('Name cannot be empty'),
    price: Yup.string()
      .required('Price cannot be empty')
      .matches(/^\d+(\.\d+)?$/, 'Price should be a number.'),
    description: Yup.string().required('Description cannot be empty'),
  });

  const handleSubmit = async (values: UpdateBarberServiceFormValues) => {
    await updateBarberServiceMutation.mutateAsync({
      id: barberServiceId,
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
          Update Service
        </Button>
      </Form>
    </Formik>
  );
}
