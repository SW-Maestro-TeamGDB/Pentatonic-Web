import react, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { media } from '../../lib/Media';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import SessionSelectMobile from '../../images/SessionSelectMobile.gif';
import SessionSelect from '../../images/SessionSelect.gif';

const SessionSelectModal = (props) => {
  const { modalToggle, setModalToggle } = props;
  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  });
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
        <TextWrapper>하나 이상의 세션을 선택해주세요</TextWrapper>
        <HelpImage src={isMobile ? SessionSelectMobile : SessionSelect} />
        <DescWrapper>
          듣고싶은 세션을 클릭해서 선택하면, 클릭된 세션을 합친 밴드커버가
          완성됩니다.
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
  height: 30rem;
  padding: 6vh 0;

  ${media.small} {
    height: 40rem;
  }
`;

const HelpImage = styled.img`
  width: 90%;
  margin-top: 3rem;

  ${media.small} {
    margin-top: 2rem;
  }
`;

const CustomExclamationIcon = styled(ExclamationCircleOutlined)`
  font-size: 8vh;
  color: #6236ff;
`;

const TextWrapper = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  margin-top: 2rem;
`;

const DescWrapper = styled.div`
  font-size: 1rem;
  margin-top: 2.5rem;
  font-weight: 700;
  padding: 0 1.5rem;
  letter-spacing: -1px;

  ${media.small} {
    font-size: 0.9rem;
    padding: 0 1rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 90%;
  padding-top: 4rem;
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
