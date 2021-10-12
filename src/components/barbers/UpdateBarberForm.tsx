import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import { imageUrl, uploadImage } from '../../api';
import { barberFromDto } from '../../domain/Barber';
import { useGetBarberQuery, useUpdateBarberMutation } from '../../queries';
import { ActionButton } from '../common/ActionButton';
import FileSelector from '../common/FileSelector';
import ImagePreview from '../common/ImagePreview';
import TextInput from '../common/TextInput';

const InputContainer = styled.div`
  margin-bottom: 1em;
`;

const PictureContainer = styled.div`
  width: 400px;
  height: 400px;
  border: 1px solid #ffffff;
  background-color: #333;
  margin-bottom: 1em;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
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

  const barber = barberFromDto(barberQuery.data);

  const initialValues: UpdateBarberFormValues = {
    name: barber.name,
    description: barber.description,
  };

  const handleSubmit = async (values: UpdateBarberFormValues) => {
    const imageFilename = imageFile !== null ? await uploadImage(imageFile) : barber.picture;

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
        <InputContainer>
          <PictureContainer>
            {imageFile !== null ? (
              <ImagePreview file={imageFile} width={400} height={400}></ImagePreview>
            ) : barber.picture != null ? (
              <Image src={imageUrl(barber.picture)} alt={`${barber.name}`}></Image>
            ) : null}
          </PictureContainer>
          <FileSelector onSelect={(file) => setImageFile(file)}></FileSelector>
        </InputContainer>
        <ActionButton type="submit">Update Barber</ActionButton>
      </Form>
    </Formik>
  );
}
