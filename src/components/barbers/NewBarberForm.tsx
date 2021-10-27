import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { uploadImage } from '../../api';
import { useCreateBarberMutation } from '../../queries';
import { useAuth } from '../auth/AuthContext';
import { ActionButton } from '../common/ActionButton';
import FileSelector from '../common/FileSelector';
import ImagePreview from '../common/ImagePreview';
import TextInput from '../common/TextInput';

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
  const auth = useAuth()!;
  const token = auth.token!;

  const initialValues: NewBarberFormValues = {
    name: '',
    description: '',
  };

  const createBarberMutation = useCreateBarberMutation();

  const handleSubmit = async (values: NewBarberFormValues) => {
    const imageFilename = imageFile !== null ? await uploadImage(imageFile, token) : null;

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
        <ActionButton type="submit">New Barber</ActionButton>
      </Form>
    </Formik>
  );
}
