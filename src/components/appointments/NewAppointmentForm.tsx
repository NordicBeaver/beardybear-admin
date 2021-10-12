import { Field, Form, Formik } from 'formik';
import React from 'react';
import styled from 'styled-components/macro';
import { useGetBarberServicesQuery, useGetBarbersQuery } from '../../queries';
import { ActionButton } from '../common/ActionButton';
import Dropdown, { Option } from '../common/Dropdown';
import TextInput from '../common/TextInput';

const InputContainer = styled.div`
  margin-bottom: 2em;
`;

interface NewAppointmentFormValues {
  barberId: string | null;
  barberServiceId: string | null;
  datetime: string;
}

export default function NewAppointmentForm() {
  const barbersQuery = useGetBarbersQuery();
  const barberServicesQuery = useGetBarberServicesQuery();

  if (barbersQuery.status !== 'success' || barberServicesQuery.status !== 'success') {
    return <p>Loading...</p>;
  }

  const initialValues: NewAppointmentFormValues = {
    barberId: null,
    barberServiceId: null,
    datetime: '',
  };

  const handleSubmit = async (values: NewAppointmentFormValues) => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <InputContainer>
          <Dropdown name="barberId" label="Barber">
            {barbersQuery.data.map((barber) => (
              <Option value={barber.id}>{barber.name}</Option>
            ))}
          </Dropdown>
        </InputContainer>
        <InputContainer>
          <Dropdown name="barberServiceId" label="Service">
            {barberServicesQuery.data.map((barberService) => (
              <Option value={barberService.id}>{barberService.name}</Option>
            ))}
          </Dropdown>
        </InputContainer>
        <InputContainer>
          <TextInput label="Date and Time" name="datetime"></TextInput>
        </InputContainer>
        <ActionButton type="submit">New Appointment</ActionButton>
      </Form>
    </Formik>
  );
}
