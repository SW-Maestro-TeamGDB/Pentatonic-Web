import react, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { LeftOutlined } from '@ant-design/icons';

const FindPasswordModal = (props) => {
  const { modalToggle, setModalToggle, closeModal, setPageStep } = props;

  return (
    <FindAccountContainer>
      <ModalHeader>
        <BakcwardButton onClick={() => setPageStep(1)}>
          <LeftOutlined />
        </BakcwardButton>
        <HeaderTitle>계정 찾기</HeaderTitle>
      </ModalHeader>
      <ModalContents></ModalContents>
    </FindAccountContainer>
  );
};

const FindAccountContainer = styled.div`
  height: 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalHeader = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 5%;
`;

const ModalContents = styled.div`
  position: absolute;
  width: 80%;
  height: 70%;
  bottom: 10%;
  display: flex;
  flex-direction: column;
`;

const Divider = styled.div`
  border-bottom: 1px solid lightgray;
  border-radius: 5px;
`;

const PageSelectButton = styled.div`
  cursor: pointer;
  height: 35%;
  transition: all ease 0.3s;
  margin: 5% 0;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const BakcwardButton = styled.span`
  position: absolute;
  cursor: pointer;
  z-index: 2;
  font-size: 1.5rem;

  &:hover {
    color: gray;
  }
`;

const SelectDesc = styled.div`
  font-size: 2rem;
  font-weight: 800;
`;

const HeaderTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  position: absolute;
  width: 100%;
`;

export default FindPasswordModal;
