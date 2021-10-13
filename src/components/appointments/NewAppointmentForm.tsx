import { Form, Formik } from 'formik';
import React from 'react';
import styled from 'styled-components/macro';
import { useCreateAppointmentMutation, useGetBarberServicesQuery, useGetBarbersQuery } from '../../queries';
import { ActionButton } from '../common/ActionButton';
import DatetimeInput from '../common/DatetimeInput';
import Dropdown, { Option } from '../common/Dropdown';

const InputContainer = styled.div`
  margin-bottom: 2em;
`;

interface NewAppointmentFormValues {
  barberId: string | null;
  barberServiceId: string | null;
  datetime: Date;
}

export default function NewAppointmentForm() {
  const barbersQuery = useGetBarbersQuery();
  const barberServicesQuery = useGetBarberServicesQuery();
  const createAppointmentMutation = useCreateAppointmentMutation();

  if (barbersQuery.status !== 'success' || barberServicesQuery.status !== 'success') {
    return <p>Loading...</p>;
  }

  const initialValues: NewAppointmentFormValues = {
    barberId: null,
    barberServiceId: null,
    datetime: new Date(),
  };

  const handleSubmit = async (values: NewAppointmentFormValues) => {
    if (values.barberId == null) return;
    if (values.barberServiceId == null) return;

    createAppointmentMutation.mutate({
      barberId: parseInt(values.barberId),
      barberServiceId: parseInt(values.barberServiceId),
      datetime: values.datetime.toISOString(),
    });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <InputContainer>
          <Dropdown name="barberId" label="Barber">
            <Option disabled selected></Option>
            {barbersQuery.data.map((barber) => (
              <Option value={barber.id}>{barber.name}</Option>
            ))}
          </Dropdown>
        </InputContainer>
        <InputContainer>
          <Dropdown name="barberServiceId" label="Service">
            <Option disabled selected></Option>
            {barberServicesQuery.data.map((barberService) => (
              <Option value={barberService.id}>{barberService.name}</Option>
            ))}
          </Dropdown>
        </InputContainer>
        <InputContainer>
          <DatetimeInput label="Date and Time" name="datetime"></DatetimeInput>
        </InputContainer>
        <ActionButton type="submit">New Appointment</ActionButton>
      </Form>
    </Formik>
  );
}
