import react, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import { CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons';

const LoadingModal = (props) => {
  const { modalToggle, setModalToggle, text } = props;

  const closeModal = () => {
    setModalToggle(false);
  };

  return (
    <CustomModal
      visible={modalToggle}
      footer={null}
      centered
      closable={false}
      maskClosable={false}
    >
      <ModalContainer>
        <CustomLoadingIcon />
        <UploadText>{text ? text : '로딩 중 입니다'}</UploadText>
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
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 25rem;
  padding: 6vh 0;
`;

export default LoadingModal;
