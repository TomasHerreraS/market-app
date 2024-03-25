import React, { useCallback, useEffect, useState } from 'react';
import { Image, Button } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { FaTrash } from "react-icons/fa";

interface ImageUploaderProps {
  onUpload: (files: File[]) => void;
  files: File[];
  onDelete: (index: number) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload, files, onDelete }) => {
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (files.length >= 3) {
      setErrorMessage('Maximum file limit (3) reached. Please select up to 3 files.');
    } else {
      setErrorMessage('');
    }
  }, [files]);


  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (files.length < 3) {

      const validExtensions = ['.jpg', '.webp', '.png', '.jpeg'];
      if (!acceptedFiles.every(file => validExtensions.some(ext => file.name.endsWith(ext)))) {
        return  setErrorMessage('File type should be .jpeg, .png, .webp, or .jpg');
      }
      
      if(acceptedFiles.every(file => (Math.round(file.size/ 1024) > 10000))) {
        return setErrorMessage('File is too large, should be less than 10mb')
        }
        onUpload(acceptedFiles);
      }
  }, [onUpload, files]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {files.length > 0 ? (
          <>
            <p>{files.length} File(s) uploaded successfully!</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: "center" }}>
              {files.map((file, index) => (
                <div key={index} style={{ margin: '10px', position: 'relative' }}>
                  <div style={{ marginBottom: '5px' }}>
                    <Image src={URL.createObjectURL(file)} alt={`Image ${index}`} style={{ maxWidth: '200px', maxHeight: '200px', border: 'solid white 0.5px' }} />
                  </div>
                  <Button style={{ borderRadius: "20px" }} variant="danger" onClick={(event) => { event.stopPropagation(); onDelete(index) }}><FaTrash size={16}/></Button>
                </div>
              ))}
            </div>
          </>
        ) : (
          isDragActive ?
            <p>Drop the image here ...</p> :
            <p>Drag 'n' drop an image here, or click to select an image</p>
        )}
      </div>
    </div>
  );
};

const dropzoneStyle: React.CSSProperties = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
  width: '80%',
  marginLeft: 'auto',
  marginRight: 'auto'
};

export default ImageUploader;
