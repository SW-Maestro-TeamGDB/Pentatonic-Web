import react, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'antd';
import LoginModal from '../LoginModal';
import FindAccountModal from '../FindAccoutModal/FindAccountModal';
import FindIdModal from '../FindIdModal.js/FindIdModal';
import FindPasswordModal from '../FindPasswordModal';
import MicAuth from './MicAuth.png';

const MicAuthModal = (props) => {
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
      <ModalTitle>마이크 권한 요청</ModalTitle>
      <CautionContainer>
        <CautionContent>
          <CustomImg src={MicAuth} width="80%" />
          <Spacing />
          <CautionTitle>
            마이크 권한을 허용하고 다시 녹음버튼을 눌러주세요
          </CautionTitle>
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
  font-size: 1rem;
  padding: 0.5rem 1rem;
  color: gray;
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
  text-align: center;
`;

const ModalTitle = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  text-align: center;
`;

const SubmitButton = styled.button`
  border-radius: 0.8rem;
  background-color: black;
  margin: 1rem 0;
  width: 95%;
  height: 4rem;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all ease-in-out 0.3s;
  &:hover {
    background-color: rgb(50, 50, 50);
  }
`;

const Spacing = styled.div`
  height: 1.5rem;
  border-bottom: 1px solid black;
`;

export default MicAuthModal;
