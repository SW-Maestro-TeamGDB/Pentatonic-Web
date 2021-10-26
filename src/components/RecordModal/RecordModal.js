import react, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'antd';
import LoginModal from '../LoginModal';
import FindAccountModal from '../FindAccoutModal/FindAccountModal';
import FindIdModal from '../FindIdModal.js/FindIdModal';
import FindPasswordModal from '../FindPasswordModal';
import MicAuth from './MicAuth.png';
import SilenceIcon from './SilenceIcon.png';

const RecordModal = (props) => {
  const { modalToggle, setModalToggle } = props;

  const closeModal = () => {
    setModalToggle(false);
  };

  return (
    <CustomModal
      visible={modalToggle}
      onCancel={closeModal}
      footer={null}
      centered
    >
      <ModalTitle>녹음 시 주의사항</ModalTitle>
      <CautionContainer>
        <CautionContent>
          <CautionTitle>1. 마이크 권한을 허용해주세요</CautionTitle>
          <CustomImg src={MicAuth} width="50%" />
          <Spacing />
          <CautionTitle>2. 녹음은 조용한 곳에서 진행해주세요</CautionTitle>
          <CustomImg src={SilenceIcon} width="20%" />
          <Spacing />
          <SubmitButton onClick={() => closeModal()}>확인했습니다</SubmitButton>
        </CautionContent>
      </CautionContainer>
    </CustomModal>
  );
};

const CustomModal = styled(Modal)`
  border-radius: 1rem;
  overflow: hidden;
`;

const CustomImg = styled.img`
  margin: 1rem 0;
`;

const CautionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2.5rem;
`;

const CautionTitle = styled.p`
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  color: black;
  font-weight: 800;
  width: 100%;
  border-radius: 0.5rem;
`;

const CautionContent = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalTitle = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  text-align: center;
`;

const SubmitButton = styled.button`
  border-radius: 0.8rem;
  background-color: rgba(98, 54, 255, 0.9);
  margin: 1rem 0;
  width: 90%;
  height: 3rem;
  border: none;
  color: white;
  font-size: 1rem;
  font-weight: 800;
  cursor: pointer;
  transition: all ease-in-out 0.3s;
  &:hover {
    background-color: rgba(98, 54, 255, 1);
  }
`;

const Spacing = styled.div`
  height: 1.5rem;
  border-bottom: 1px solid black;
`;

export default RecordModal;
