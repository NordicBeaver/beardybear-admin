import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import { imageUrl, uploadImage } from '../api';
import { useGetBarberQuery, useUpdateBarberMutation } from '../queries';
import FileSelector from './FileSelector';
import ImagePreview from './ImagePreview';
import TextInput from './TextInput';

const InputContainer = styled.div`
  margin-bottom: 1em;
`;

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
        <InputContainer>
          <TextInput label="Name" name="name"></TextInput>
        </InputContainer>
        <InputContainer>
          <TextInput label="Description" name="description"></TextInput>
        </InputContainer>

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
