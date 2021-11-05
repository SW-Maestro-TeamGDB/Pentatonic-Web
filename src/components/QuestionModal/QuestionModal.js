import react, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import { QuestionCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { media } from '../../lib/Media';

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
      closable={true}
      maskClosable={true}
    >
      <ModalContainer>
        <CustomCheckIcon />
        <TextWrapper>{text ? text : null}</TextWrapper>
        {desc ? <DescWrapper>{desc}</DescWrapper> : null}
        <ButtonContainer desc={desc}>
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

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 24rem;

  ${media.small} {
    height: 20rem;
  }
`;

const CustomCheckIcon = styled(QuestionCircleOutlined)`
  font-size: 8vh;
  color: #6236ff;
`;

const TextWrapper = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  margin-top: 2.5rem;

  ${media.small} {
    font-size: 1.1rem;
  }
`;

const DescWrapper = styled.div`
  font-size: 1rem;
  margin-top: 2rem;
  font-weight: 500;

  ${media.small} {
    font-size: 0.8rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 90%;
  padding-top: ${(props) => (props.desc ? '3rem' : '6rem')};
`;

const AcceptButton = styled.div`
  cursor: pointer;
  width: 10rem;
  padding: 0.5rem 0.5rem;
  color: white;
  background-image: linear-gradient(to right, #6236ff, #9b66ff);
  border-radius: 0.5rem;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 700;

  &:hover {
    color: white;
  }

  ${media.small} {
    width: 8em;
    font-size: 1rem;
  }
`;

const RefuseButton = styled.div`
  cursor: pointer;
  width: 10em;
  padding: 0.5rem 0.5rem;
  color: #925fff;
  border: 1px solid #925fff;
  border-radius: 0.5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1rem;
  font-weight: 700;

  &:hover {
    color: #925fff;
  }

  ${media.small} {
    width: 8em;
    font-size: 1rem;
  }
`;

export default QuestionModal;
