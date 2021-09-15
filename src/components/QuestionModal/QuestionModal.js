import react, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import { QuestionCircleOutlined, LoadingOutlined } from '@ant-design/icons';

const QuestionModal = (props) => {
  const {
    modalToggle,
    setModalToggle,
    modalLoading,
    text,
    afterRequest,
    desc,
  } = props;

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
      maskClosable={false}
    >
      <ModalContainer>
        <CustomCheckIcon />
        <TextWrapper>{text ? text : null}</TextWrapper>
        {desc ? <DescWrapper>{desc}</DescWrapper> : null}
        <ButtonContainer>
          <RefuseButton onClick={closeModal}>아니요</RefuseButton>
          <AcceptButton onClick={afterRequest}>네</AcceptButton>
        </ButtonContainer>
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

const CustomCheckIcon = styled(QuestionCircleOutlined)`
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
  min-width: 10rem;
  padding: 1vh 0.5vw;
  color: white;
  background-image: linear-gradient(to right, #6236ff, #9b66ff);
  border-radius: 1vh;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.8vh;
  font-weight: 700;

  &:hover {
    color: white;
  }
`;

const RefuseButton = styled.div`
  cursor: pointer;
  min-width: 10em;
  padding: 1vh 0.5vw;
  color: #925fff;
  border: 1px solid #925fff;
  border-radius: 1vh;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.8vh;
  font-weight: 700;

  &:hover {
    color: #925fff;
  }
`;

export default QuestionModal;
