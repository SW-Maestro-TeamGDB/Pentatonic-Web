import react, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'antd';
import { media } from '../../lib/Media';

const SurveyModal = (props) => {
  const { modalToggle, setModalToggle, title } = props;

  const closeModal = () => {
    setModalToggle(false);
  };

  const onClickSurveyButton = () => {
    window.open('https://forms.gle/oFEhTe2suQeAB2HG6');
    closeModal();
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
      <SurveyModalContainer>
        <SurveyModalTitle>모여서 하나되다, 펜타토닉 입니다</SurveyModalTitle>
        <SurveyModalContent>
          아래 버튼을 눌러 피드백을 보내주세요!
          <br />
          서비스 발전에 큰 도움이 됩니다 ✨
        </SurveyModalContent>
        <SurveyModalButton onClick={onClickSurveyButton}>
          피드백 보내기
        </SurveyModalButton>
      </SurveyModalContainer>
    </CustomModal>
  );
};

const CustomModal = styled(Modal)`
  border-radius: 1rem;
  overflow: hidden;
`;

const SurveyModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SurveyModalTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 900;
  letter-spacing: -2px;

  ${media.small} {
    font-size: 1rem;
  }
`;

const SurveyModalContent = styled.div`
  font-size: 1rem;
  font-weight: 700;
  margin: 3rem 0 2rem;

  text-align: center;

  ${media.small} {
    font-size: 0.8rem;
  }
`;

const SurveyModalButton = styled.button`
  border-radius: 0.8rem;
  background-color: rgba(98, 54, 255, 0.9);
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
    background-color: rgba(98, 54, 255, 1);
  }

  ${media.small} {
    font-size: 0.8rem;
    padding: 0.5rem 0;
  }
`;

export default SurveyModal;
