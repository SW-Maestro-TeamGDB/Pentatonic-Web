import react, { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import { QuestionCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const CropModal = (props) => {
  const { modalToggle, setModalToggle, image, afterRequest } = props;
  const cropperRef = useRef();
  const cropperInstance = useRef(null);

  const closeModal = () => {
    setModalToggle(false);
  };

  const onClickSubmitButton = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    cropper.getCroppedCanvas().toBlob((blob) => {
      const file = new File([blob], `image.png`, { type: blob.type });
      afterRequest(file);
    });
  };

  return (
    <CustomModal
      visible={modalToggle}
      onCancel={closeModal}
      footer={null}
      centered
      closable={true}
      maskClosable={false}
    >
      <ModalContainer>
        <Cropper
          src={image}
          style={{ width: '80%', height: '80%', marginTop: '2rem' }}
          initialAspectRatio={1 / 1}
          aspectRatio={1 / 1}
          guides={true}
          onInitialized={(instance) => {
            cropperInstance.current = instance;
          }}
          minCropBoxHeight={200}
          minCropBoxWidth={200}
          background={false}
          ref={cropperRef}
          dragMode="move"
          viewMode={3}
        />
        <SubmitButton onClick={onClickSubmitButton}>완료</SubmitButton>
      </ModalContainer>
    </CustomModal>
  );
};

const CustomModal = styled(Modal)`
  border-radius: 1rem;
  overflow: hidden;
`;

const UploadText = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 7vh;
`;

const CustomLoadingIcon = styled(LoadingOutlined)`
  font-size: 8rem;
  color: #6236ff;
`;

const ModalContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 29rem;
`;

const SubmitButton = styled.button`
  border-radius: 0.8rem;
  background-color: black;
  margin: 1.5rem 0;
  width: 80%;
  padding: 0.7rem 0;
  border: none;
  color: white;
  font-size: 1rem;
  font-weight: 800;
  cursor: pointer;
  transition: all ease-in-out 0.3s;
  &:hover {
    background-color: rgb(50, 50, 50);
  }
`;

export default CropModal;
