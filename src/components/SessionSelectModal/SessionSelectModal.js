import react, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const SessionSelectModal = (props) => {
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
      closable={false}
      maskClosable={true}
    >
      <ModalContainer>
        <CustomExclamationIcon />
        <TextWrapper>세션을 선택해주세요</TextWrapper>
        <DescWrapper>
          하나 이상의 세션을 선택해야 커버를 감상 할 수 있습니다
        </DescWrapper>
        <ButtonContainer>
          <AcceptButton onClick={closeModal}>확인</AcceptButton>
        </ButtonContainer>
      </ModalContainer>
    </CustomModal>
  );
};

const CustomModal = styled(Modal)`
  border-radius: 1rem;
  overflow: hidden;
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

const CustomExclamationIcon = styled(ExclamationCircleOutlined)`
  font-size: 8vh;
  color: #6236ff;
`;

const TextWrapper = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  margin-top: 2.5rem;
`;

const DescWrapper = styled.div`
  font-size: 1rem;
  margin-top: 3rem;
  font-weight: 500;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 90%;
  padding-top: 5rem;
`;

const AcceptButton = styled.div`
  cursor: pointer;
  min-width: 20rem;
  padding: 12px 5px;
  color: white;
  background-image: linear-gradient(to right, #6236ff, #9b66ff);
  border-radius: 1vh;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 16px;
  font-weight: 700;

  &:hover {
    color: white;
  }
`;

export default SessionSelectModal;
