import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { uploadImage } from '../api';
import { useCreateBarberMutation } from '../queries';
import FileSelector from './FileSelector';
import ImagePreview from './ImagePreview';
import TextInput from './TextInput';

const InputContainer = styled.div`
  margin-bottom: 2em;
`;

const PictureContainer = styled.div`
  width: 400px;
  height: 400px;
  border: 1px solid #ffffff;
  background-color: #333;
  margin-bottom: 1em;
`;

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

  const handleSubmit = async (values: NewBarberFormValues) => {
    const imageFilename = imageFile !== null ? await uploadImage(imageFile) : null;

    createBarberMutation.mutate({
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
            {imageFile != null ? <ImagePreview file={imageFile} width={400} height={400}></ImagePreview> : null}
          </PictureContainer>
          <FileSelector onSelect={(file) => setImageFile(file)}></FileSelector>
        </InputContainer>
        <input type="submit" value="New Barber"></input>
      </Form>
    </Formik>
  );
}
