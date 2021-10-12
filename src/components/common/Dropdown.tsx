import { FieldHookConfig, useField } from 'formik';
import React, { PropsWithChildren } from 'react';
import styled from 'styled-components/macro';

const Container = styled.div`
  position: relative;
  padding-top: 8px;
`;

const Label = styled.label`
  position: absolute;
  top: 0px;
  left: 5px;
  padding: 0 4px;
  font-size: 0.8em;
  background-color: #141414;
`;

const Select = styled.select`
  width: 100%;
  border: 1px solid #ffffff;
  border-radius: 8px;
  padding: 0.8em 1em;
  font-size: 1.1em;
  font-family: inherit;
  background-color: #141414;
  color: #ffffff;
`;

export const Option = styled.option`
  appearance: none;
  padding: 0.8em 1em;
`;

interface MyDropdownProps {
  label: string;
}

export type DropdownProps = MyDropdownProps & PropsWithChildren<FieldHookConfig<string>>;

export default function Dropdown({ label, children, ...config }: DropdownProps) {
  const [field, meta] = useField(config);

  return (
    <Container>
      <Label>{label}</Label>
      <Select {...field}>{children}</Select>
    </Container>
  );
}
