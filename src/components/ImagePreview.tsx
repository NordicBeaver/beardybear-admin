import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';

function readAsDataUrl(file: File) {
  const promise = new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', (e) => resolve(e.target!.result as string));
    reader.addEventListener('error', (e) => reject(e.target!.error));
    reader.readAsDataURL(file);
  });
  return promise;
}

const Image = styled.img`
  object-fit: contain;
`;

export interface ImagePreviewProps {
  file: File;
  width: number;
  height: number;
}
export default function ImagePreview({ file, width, height }: ImagePreviewProps) {
  const [dataUrl, setDataUrl] = useState('');

  useEffect(() => {
    const updateDataUrl = async () => {
      const url = await readAsDataUrl(file);
      setDataUrl(url);
    };
    updateDataUrl();
  }, [file]);

  return <Image src={dataUrl} alt={file.name} width={width} height={height} />;
}
