import { FieldHookConfig, useField } from 'formik';
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface MyDatetimeInputProps {
  label: string;
}

export type DatetimeInputProps = MyDatetimeInputProps & FieldHookConfig<Date>;

export default function DatetimeInput({ label, ...config }: DatetimeInputProps) {
  const [field, meta, helpers] = useField(config);

  return (
    <ReactDatePicker
      showTimeSelect
      dateFormat="MMMM d, yyyy h:mm aa"
      selected={field.value}
      onChange={(date) => helpers.setValue(date as Date)}
    ></ReactDatePicker>
  );
}
