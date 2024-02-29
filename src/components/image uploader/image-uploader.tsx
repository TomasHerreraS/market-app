import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploaderProps {
  onUpload: (file: File[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
  const [isUploaded, setIsUploaded] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    onUpload(acceptedFiles);
    setIsUploaded(true); // Set uploaded state to true when files are uploaded
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={dropzoneStyle}>
      <input {...getInputProps()} />
      {
        isUploaded ? (
          <p>Files uploaded successfully!</p>
        ) : (
          isDragActive ?
            <p>Drop the image here ...</p> :
            <p>Drag 'n' drop an image here, or click to select an image</p>
        )
      }
    </div>
  );
};

const dropzoneStyle: React.CSSProperties = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default ImageUploader;
