import React from 'react';

export interface FileSelectorProps {
  onSelect: (file: File) => void;
}

export default function FileSelector({ onSelect }: FileSelectorProps) {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files != null) {
      if (e.target.files.length > 0) {
        const file = e.target.files[0];
        onSelect(file);
      }
    }
    console.log(e.target.files);
  };

  return (
    <div>
      <input type="file" onChange={handleChange} accept="image/*"></input>
    </div>
  );
}
