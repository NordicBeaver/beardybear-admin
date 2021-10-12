import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components/macro';
import { barberServiceFromDto } from '../../domain/BarberService';
import { useGetBarberServiceQuery, useUpdateBarberServiceMutation } from '../../queries';
import { ActionButton } from '../common/ActionButton';
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

  const handleSubmit = (values: UpdateBarberServiceFormValues) => {
    updateBarberServiceMutation.mutate({
      id: barberServiceId,
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
        <ActionButton type="submit">Update Service</ActionButton>
      </Form>
    </Formik>
  );
}
