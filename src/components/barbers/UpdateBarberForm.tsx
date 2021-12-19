import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import { imageUrl, uploadImage } from '../../api';
import { barberFromDto } from '../../domain/Barber';
import { useDeleteBarberMutation, useGetBarberQuery, useUpdateBarberMutation } from '../../queries';
import { useAuth } from '../auth/AuthContext';
import { Button } from '../common/Button';
import FileSelector from '../common/FileSelector';
import ImagePreview from '../common/ImagePreview';
import TextInput from '../common/TextInput';
import * as Yup from 'yup';

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

  const history = useHistory();

  const auth = useAuth()!;
  const token = auth.token!;

  const [imageFile, setImageFile] = useState<File | null>(null);

  const barberQuery = useGetBarberQuery(barberId);

  const updateBarberMutation = useUpdateBarberMutation();
  const deleteBarberMutation = useDeleteBarberMutation();

  if (barberQuery.status !== 'success') {
    return <p>Loading...</p>;
  }

  const validationSchema: Yup.SchemaOf<UpdateBarberFormValues> = Yup.object({
    name: Yup.string().required('Name cannot be empty'),
    description: Yup.string().required('Description cannot be empty'),
  });

  const barber = barberFromDto(barberQuery.data);

  const initialValues: UpdateBarberFormValues = {
    name: barber.name,
    description: barber.description,
  };

  const handleSubmit = async (values: UpdateBarberFormValues) => {
    const imageFilename = imageFile !== null ? await uploadImage(imageFile, token) : barber.picture;

    await updateBarberMutation.mutateAsync({
      id: barberId,
      name: values.name,
      description: values.description,
      picture: imageFilename,
    });

    history.push('/barbers');
  };

  const handleDelete = async () => {
    await deleteBarberMutation.mutateAsync(barber.id);
    history.push('/barbers');
  };

  return (
    <div>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
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
          <Button type="submit" variant="action">
            Update Barber
          </Button>
          {barber.deletedAt === undefined ? (
            <Button variant="caution" onClick={handleDelete}>
              Delete Barber
            </Button>
          ) : null}
        </Form>
      </Formik>
    </div>
  );
}
