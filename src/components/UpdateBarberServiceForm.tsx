import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useParams } from 'react-router';
import { useGetBarberServiceQuery, useUpdateBarberServiceMutation } from '../queries';

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

  const initialValues: UpdateBarberServiceFormValues = {
    name: barberServiceQuery.data.name,
    price: barberServiceQuery.data.price,
    description: barberServiceQuery.data.description,
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
        <div>
          <label htmlFor="name">Name</label>
          <Field name="name" type="text"></Field>
        </div>
        <div>
          <label htmlFor="price">Price ($)</label>
          <Field name="price" type="text"></Field>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <Field name="description" type="text"></Field>
        </div>
        <input type="submit" value="Update Service"></input>
      </Form>
    </Formik>
  );
}
