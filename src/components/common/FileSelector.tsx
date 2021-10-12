import React from 'react';
import styled from 'styled-components/macro';

const BrowseButton = styled.label`
  display: inline-block;
  background-color: #fff;
  color: #141414;
  padding: 0.3em 0.6em;
  font-size: 1.2em;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

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
    <BrowseButton>
      Browse
      <input type="file" onChange={handleChange} accept="image/*" hidden></input>
    </BrowseButton>
  );
}
