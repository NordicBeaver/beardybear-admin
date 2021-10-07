import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { imageUrl, uploadImage } from '../api';
import { useGetBarberQuery, useUpdateBarberMutation } from '../queries';
import FileSelector from './FileSelector';
import ImagePreview from './ImagePreview';

interface UpdateBarberFormValues {
  name: string;
  description: string;
}

export default function UpdateBarberForm() {
  const { id: barberIdString } = useParams<{ id: string }>();
  const barberId = parseInt(barberIdString);

  const [imageFile, setImageFile] = useState<File | null>(null);

  const barberQuery = useGetBarberQuery(barberId);

  const updateBarberMutation = useUpdateBarberMutation();

  if (barberQuery.status !== 'success') {
    return <p>Loading...</p>;
  }

  const initialValues: UpdateBarberFormValues = {
    name: barberQuery.data.name,
    description: barberQuery.data.description,
  };

  const handleSubmit = async (values: UpdateBarberFormValues) => {
    const imageFilename = imageFile !== null ? await uploadImage(imageFile) : barberQuery.data.picture;

    updateBarberMutation.mutate({
      id: barberId,
      name: values.name,
      description: values.description,
      picture: imageFilename,
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
        {imageFile !== null ? (
          <ImagePreview file={imageFile}></ImagePreview>
        ) : barberQuery.data.picture != null ? (
          <img src={imageUrl(barberQuery.data.picture)} alt={`${barberQuery.data.name}`}></img>
        ) : null}
        <input type="submit" value="Update Barber"></input>
      </Form>
    </Formik>
  );
}
