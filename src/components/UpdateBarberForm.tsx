import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetBarberQuery, useUpdateBarberMutation } from '../queries';

interface UpdateBarberFormValues {
  name: string;
  description: string;
}

export default function UpdateBarberForm() {
  const { id: barberIdString } = useParams<{ id: string }>();
  const barberId = parseInt(barberIdString);

  const barberQuery = useGetBarberQuery(barberId);

  const updateBarberMutation = useUpdateBarberMutation();

  if (barberQuery.status !== 'success') {
    return <p>Loading...</p>;
  }

  const initialValues: UpdateBarberFormValues = {
    name: barberQuery.data.name,
    description: barberQuery.data.description,
  };

  const handleSubmit = (values: UpdateBarberFormValues) => {
    updateBarberMutation.mutate({
      id: barberId,
      name: values.name,
      description: values.description,
    });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <div>
          <label htmlFor="name">Name</label>
          <Field name="name" type="text"></Field>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <Field name="description" type="text"></Field>
        </div>
        <input type="submit" value="Update Barber"></input>
      </Form>
    </Formik>
  );
}
