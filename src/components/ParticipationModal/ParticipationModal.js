import react, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const ParticipationModal = (props) => {
  const { modalToggle, setModalToggle, onClickLeftButton, onClickRightButton } =
    props;

  const closeModal = () => {
    setModalToggle(false);
  };

  return (
    <CustomModal
      visible={modalToggle}
      onCancel={closeModal}
      footer={null}
      centered
      closable={true}
      maskClosable={true}
    >
      <ModalContainer>
        <CustomExclamationIcon />
        <TextWrapper>어떤 방식으로 밴드에 참여할까요?</TextWrapper>
        <CautionContent>
          <CautionTitle>1. 새로 녹음하기</CautionTitle>
          <CautionDesc>
            녹음에 참여한 세션의 연주를 들으며 라이브러리를 새로 녹음하게 됩니다
          </CautionDesc>
          <Spacing />
          <CautionTitle>2. 라이브러리로 참여하기</CautionTitle>
          <CautionDesc>
            이전에 녹음한 라이브러리 녹음본으로 참여합니다 <br />
            (같은 곡으로 녹음된 라이브러리만 참여 할 수 있습니다)
          </CautionDesc>
        </CautionContent>
        <ButtonContainer>
          <AcceptButton onClick={onClickLeftButton}>새로 녹음하기</AcceptButton>
          <AcceptButton onClick={onClickRightButton}>
            라이브러리로 참여하기
          </AcceptButton>
        </ButtonContainer>
      </ModalContainer>
    </CustomModal>
  );
};

const CustomExclamationIcon = styled(ExclamationCircleOutlined)`
  font-size: 5vh;
  color: #6236ff;
`;

const CustomModal = styled(Modal)`
  border-radius: 1rem;
  overflow: hidden;
`;

const UploadText = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 7vh;
`;

const CautionContent = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  border-radius: 10px;

  background-color: rgb(240, 240, 240);
  padding: 1rem 1.5rem;
`;

const CautionTitle = styled.p`
  font-size: 16px;
  color: black;
  font-weight: 700;
  width: 100%;
`;

const CautionDesc = styled.p`
  width: 100%;

  font-size: 14px;
  background-color: #fff;
  border-radius: 10px;

  padding: 0.5rem 1.2rem;
`;

const Spacing = styled.div`
  height: 0.5rem;
  border-bottom: 1px solid black;
`;

const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;

  width: 100%;
  height: auto;
  padding: 2.5vh 0;
`;

const TextWrapper = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  margin-top: 1rem;
`;

const DescWrapper = styled.div`
  font-size: 1rem;
  margin-top: 3rem;
  font-weight: 500;
`;

const ButtonContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-top: 2.5rem;
`;

const AcceptButton = styled.div`
  cursor: pointer;
  min-width: 10rem;
  padding: 1vh 1vw;
  color: white;
  background-color: #6236ff;
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

export default ParticipationModal;
