import React, { useEffect, useState } from 'react';

function readAsDataUrl(file: File) {
  const promise = new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', (e) => resolve(e.target!.result as string));
    reader.addEventListener('error', (e) => reject(e.target!.error));
    reader.readAsDataURL(file);
  });
  return promise;
}

export interface ImagePreviewProps {
  file: File;
}
export default function ImagePreview({ file }: ImagePreviewProps) {
  const [dataUrl, setDataUrl] = useState('');

  useEffect(() => {
    const updateDataUrl = async () => {
      const url = await readAsDataUrl(file);
      setDataUrl(url);
    };
    updateDataUrl();
  }, [file]);

  return <img src={dataUrl} alt={file.name} />;
}
