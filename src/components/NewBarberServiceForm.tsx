import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useCreateBarberServiceMutation } from '../queries';

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
        <input type="submit" value="New Barber Service"></input>
      </Form>
    </Formik>
  );
}
