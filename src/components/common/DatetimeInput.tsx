import { FieldHookConfig, useField } from 'formik';
import React, { forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components/macro';

const Container = styled.div`
  position: relative;
  padding-top: 8px;
`;

const TextInputStyled = styled.input`
  width: 100%;
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

interface MyDatetimeInputProps {
  label: string;
}

export type DatetimeInputProps = MyDatetimeInputProps & FieldHookConfig<Date>;

export default function DatetimeInput({ label, ...config }: DatetimeInputProps) {
  const [field, meta, helpers] = useField(config);

  const CustomInput = (
    <Container>
      <Label>{label}</Label>
      <TextInputStyled type="text" value={field.value.toLocaleString()}></TextInputStyled>
    </Container>
  );

  return (
    <ReactDatePicker
      customInput={CustomInput}
      showTimeSelect
      dateFormat="MMMM d, yyyy h:mm aa"
      selected={field.value}
      onChange={(date) => helpers.setValue(date as Date)}
    ></ReactDatePicker>
  );
}
