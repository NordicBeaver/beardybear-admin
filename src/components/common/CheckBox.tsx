import React from 'react';

export interface CheckBoxProps {
  label: string;
  value: boolean;
  onChange?: (value: boolean) => void;
}
export default function CheckBox({ label, value, onChange }: CheckBoxProps) {
  return (
    <label>
      <input type="checkbox" checked={value} onChange={(e) => onChange?.(e.target.checked)}></input> {label}
    </label>
  );
}
