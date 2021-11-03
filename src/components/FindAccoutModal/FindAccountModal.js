import react, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { Default, media } from '../../lib/Media';
import { LeftOutlined, SearchOutlined } from '@ant-design/icons';

const FindAccountModal = (props) => {
  const { modalToggle, setModalToggle, closeModal, setPageStep } = props;

  return (
    <FindAccountContainer>
      <ModalHeader>
        <BakcwardButton onClick={() => setPageStep(0)}>
          <LeftOutlined />
        </BakcwardButton>
        <HeaderTitle>계정 찾기</HeaderTitle>
      </ModalHeader>
      <SelectContainer>
        <PageSelectButton onClick={() => setPageStep(2)}>
          <SelectDesc>
            <IconContainer>
              <SearchOutlined />
            </IconContainer>
            <TextContainer>아이디 찾기</TextContainer>
          </SelectDesc>
        </PageSelectButton>
        <Divider />
        <PageSelectButton onClick={() => setPageStep(3)}>
          <SelectDesc>
            <IconContainer>123</IconContainer>
            <TextContainer>비밀번호 찾기</TextContainer>
          </SelectDesc>
        </PageSelectButton>
      </SelectContainer>
    </FindAccountContainer>
  );
};

const FindAccountContainer = styled.div`
  height: 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${media.small} {
    height: 24rem;
  }
`;

const ModalHeader = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 5%;
`;

const SelectContainer = styled.div`
  position: absolute;
  width: 80%;
  height: 70%;
  bottom: 10%;
  display: flex;
  flex-direction: column;

  ${media.small} {
    height: 60%;
    bottom: 20%;
  }
`;

const Divider = styled.div`
  border-bottom: 1px solid lightgray;
  border-radius: 5px;
`;

const PageSelectButton = styled.div`
  cursor: pointer;
  height: 40%;
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

const IconContainer = styled.div`
  font-size: 3rem;
  width: 30%;
  text-align: center;

  ${media.small} {
    font-size: 2rem;
  }
`;

const TextContainer = styled.div`
  font-size: 2rem;
  width: 70%;
  text-align: center;

  ${media.small} {
    font-size: 1.5rem;
  }
`;

const SelectDesc = styled.div`
  font-weight: 800;
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
`;

const HeaderTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  position: absolute;
  width: 100%;

  ${media.small} {
    font-size: 1.3rem;
  }
`;

export default FindAccountModal;
