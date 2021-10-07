import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useCreateBarberMutation } from '../queries';
import FileSelector from './FileSelector';
import ImagePreview from './ImagePreview';

interface NewBarberFormValues {
  name: string;
  description: string;
}

export default function NewBarberForm() {
  const [imageFile, setImageFile] = useState<File | null>(null);

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
        <FileSelector onSelect={(file) => setImageFile(file)}></FileSelector>
        {imageFile !== null ? <ImagePreview file={imageFile}></ImagePreview> : null}
        <input type="submit" value="New Barber"></input>
      </Form>
    </Formik>
  );
}
