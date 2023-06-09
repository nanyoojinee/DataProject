import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { imgFileState } from '../../stores';

export default function FileUpload() {
  const [imageSrc, setImageSrc] = useState(null);
  const [, setImgFile] = useRecoilState(imgFileState);

  useEffect(() => {
    return () => {
      setImgFile(null);
      setImageSrc(null);
    };
  }, []);

  const onUpload = e => {
    const file = e.target.files[0];
    setImgFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise(resolve => {
      reader.onload = () => {
        setImageSrc(reader.result || null); // 파일의 컨텐츠
        resolve();
      };
    });
  };

  return (
    <>
      <FileInput type="file" id="file" onChange={onUpload} />
      <FileInputLabel htmlFor="file" imageSrc={imageSrc}>
        {!imageSrc && <img src="/images/groups/details/addBtn.png" alt="인증사진 추가버튼" />}
      </FileInputLabel>
    </>
  );
}

const FileInput = styled.input`
  display: none;
`;

const FileInputLabel = styled.label`
  display: block;
  width: 100%;
  height: 25rem;
  border: 1px solid #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: 600;
  color: #111;
  background: ${({ imageSrc }) => (imageSrc ? `url(${imageSrc}) no-repeat center` : '#eee')};
  background-size: cover;
  cursor: pointer;

  img {
    width: 5rem;
  }
`;
