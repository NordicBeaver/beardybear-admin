import { FieldHookConfig, useField } from 'formik';
import React from 'react';
import styled from 'styled-components/macro';

const Container = styled.div`
  position: relative;
  padding-top: 8px;
`;

const TextInputStyled = styled.input`
  font-family: inherit;
  background-color: #141414;
  color: #ffffff;
  font-size: 1.1em;
  padding: 0.8em 1em;
  border: 1px solid #ffffff;
  border-radius: 8px;
`;

const Label = styled.label`
  position: absolute;
  top: 0px;
  left: 5px;
  padding: 0 4px;
  font-size: 0.8em;
  background-color: #141414;
`;

interface MyTextInputProps {
  label: string;
}

export type TextInputProps = MyTextInputProps & FieldHookConfig<string>;

export default function TextInput({ label, ...config }: TextInputProps) {
  const [field, meta] = useField(config);

  return (
    <Container>
      <Label>{label}</Label>
      <TextInputStyled type="text" {...field}></TextInputStyled>
    </Container>
  );
}
