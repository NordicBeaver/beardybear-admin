import { Form, Formik } from 'formik';
import React from 'react';
import styled from 'styled-components/macro';
import { useCreateAppointmentMutation, useGetBarberServicesQuery, useGetBarbersQuery } from '../../queries';
import { ActionButton } from '../common/ActionButton';
import DatetimeInput from '../common/DatetimeInput';
import Dropdown, { Option } from '../common/Dropdown';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

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

  const history = useHistory();

  if (barbersQuery.status !== 'success' || barberServicesQuery.status !== 'success') {
    return <p>Loading...</p>;
  }

  const initialValues: NewAppointmentFormValues = {
    barberId: null,
    barberServiceId: null,
    datetime: new Date(),
  };

  const validationSchema: Yup.SchemaOf<NewAppointmentFormValues> = Yup.object({
    barberId: Yup.string().required('Please select the barber'),
    barberServiceId: Yup.string().required('Please select the service'),
    datetime: Yup.date().required('Please select the date'),
  });

  const handleSubmit = async (values: NewAppointmentFormValues) => {
    if (values.barberId == null) return;
    if (values.barberServiceId == null) return;

    await createAppointmentMutation.mutateAsync({
      barberId: parseInt(values.barberId),
      barberServiceId: parseInt(values.barberServiceId),
      datetime: values.datetime.toISOString(),
    });

    history.push('/appointments');
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
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
