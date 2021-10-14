import react, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import { CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons';

const UploadCompleteModal = (props) => {
  const { modalToggle, setModalToggle, modalLoading, bandId, cover } = props;

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
        {modalLoading ? (
          <>
            <CustomLoadingIcon />
            <UploadText>
              {cover ? '커버' : '라이브러리'}를 업로드 중입니다
            </UploadText>
          </>
        ) : cover ? (
          <>
            <CustomCheckIcon />
            <TextWrapper>커버가 업로드 되었습니다.</TextWrapper>
            <ButtonContainer>
              <CoverRoomButton to={`/lounge/cover/${bandId}`}>
                커버룸 확인하기
              </CoverRoomButton>
              <LibraryButton to="/library">라이브러리 확인하기</LibraryButton>
            </ButtonContainer>
          </>
        ) : (
          <>
            <CustomCheckIcon />
            <TextWrapper>라이브러리가 업로드 되었습니다.</TextWrapper>
            <ButtonContainer>
              {bandId ? (
                <CoverRoomButton to={`/lounge/cover/${bandId}`}>
                  커버룸 확인하기
                </CoverRoomButton>
              ) : null}
              <LibraryButton to="/library">라이브러리 확인하기</LibraryButton>
            </ButtonContainer>
          </>
        )}
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

const CustomCheckIcon = styled(CheckCircleOutlined)`
  font-size: 10vh;
  color: #6236ff;
`;

const TextWrapper = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 2.5vh;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 90%;
  padding-top: 7vh;
`;

const CoverRoomButton = styled(Link)`
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

const LibraryButton = styled(Link)`
  cursor: pointer;
  min-width: 10em;
  padding: 1vh 0.5vw;
  color: #925fff;
  border: 1px solid #925fff;
  border-radius: 1vh;

  margin-left: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.8vh;
  font-weight: 700;

  &:hover {
    color: #925fff;
  }
`;

export default UploadCompleteModal;
