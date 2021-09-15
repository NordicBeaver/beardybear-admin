import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useCreateBarberMutation } from '../queries';

interface NewBarberFormValues {
  name: string;
  description: string;
}

export default function NewBarberForm() {
  const initialValues: NewBarberFormValues = {
    name: '',
    description: '',
  };

  const createBarberMutation = useCreateBarberMutation();

  const handleSubmit = (values: NewBarberFormValues) => {
    createBarberMutation.mutate({
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
        <input type="submit" value="New Barber"></input>
      </Form>
    </Formik>
  );
}
