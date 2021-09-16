import { Field, Form, Formik } from 'formik';
import React from 'react';

interface UpdateBarberFormValues {
  name: string;
  description: string;
}

export default function UpdateBarberForm() {
  const initialValues: UpdateBarberFormValues = {
    name: '',
    description: '',
  };

  const handleSubmit = (values: UpdateBarberFormValues) => {};

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
        <input type="submit" value="New Barber"></input>
      </Form>
    </Formik>
  );
}
