import react, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Default } from '../../lib/Media';
import { Link } from 'react-router-dom';
import { Checkbox } from 'antd';

const RegisterTermsOfService = (props) => {
  const { pageStep, setPageStep, nextPage, prevPage } = props;
  const [check, setCheck] = useState(false);
  const [error, setError] = useState(false);

  const onClickNextButton = () => {
    if (!check) {
      return setError(true);
    } else {
      return nextPage();
    }
  };

  useEffect(() => {
    setError(false);
  }, [check]);

  const Terms = () => {
    return (
      <>
        <b>펜타토닉 이용약관 </b>
        <br />
        <br />
        개인정보보호법에 따라 네이버에 회원가입 신청하시는 분께 수집하는
        개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및
        이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니
        자세히 읽은 후 동의하여 주시기 바랍니다.
        <br />
        <br />
        개인정보보호법에 따라 네이버에 회원가입 신청하시는 분께 수집하는
        개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및
        이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니
        자세히 읽은 후 동의하여 주시기 바랍니다.
        <br />
        <br />
        개인정보보호법에 따라 네이버에 회원가입 신청하시는 분께 수집하는
        개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및
        이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니
        자세히 읽은 후 동의하여 주시기 바랍니다.
        <br />
        <br />
        개인정보보호법에 따라 네이버에 회원가입 신청하시는 분께 수집하는
        개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및
        이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니
        자세히 읽은 후 동의하여 주시기 바랍니다.
        <br />
        <br />
        개인정보보호법에 따라 네이버에 회원가입 신청하시는 분께 수집하는
        개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및
        이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니
        자세히 읽은 후 동의하여 주시기 바랍니다.
        <br />
        <br />
      </>
    );
  };

  return (
    <Container>
      <TermsContainer>{Terms()}</TermsContainer>
      <TermsCheckContainer>
        <TermsQuestion>이용약관에 동의합니다</TermsQuestion>
        <CustomCheckbox
          value={check}
          onChange={(e) => {
            setCheck(e.target.checked);
          }}
        />
      </TermsCheckContainer>
      <ErrorContainer>
        {error ? <ErrorMessage>이용약관에 동의해주세요</ErrorMessage> : null}
      </ErrorContainer>
      <ButtonConatiner>
        <CustomButton
          onClick={() => {
            window.history.back();
          }}
        >
          뒤로가기
        </CustomButton>
        <CustomButton
          onClick={() => {
            onClickNextButton();
          }}
        >
          다음으로
        </CustomButton>
      </ButtonConatiner>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 55vh;
`;

const TermsContainer = styled.div`
  width: 75%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  padding: 1rem 1rem;
  overflow-y: scroll;
  height: 35vh;
`;

const TermsQuestion = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 1rem;
`;

const ErrorContainer = styled.div`
  height: 1rem;
  width: 100%;
  text-align: center;
  margin-top: 0.5rem;
`;

const CustomCheckbox = styled(Checkbox)`
  margin: 0 1rem;
`;

const TermsCheckContainer = styled.div`
  width: 50vw;
  min-width: 70%;
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ErrorMessage = styled.span`
  text-align: center;
  color: #cb0000;
`;

const ButtonConatiner = styled.div`
  position: absolute;
  width: 50vw;
  min-width: 70%;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const CustomButton = styled.button`
  background-color: black;
  border: none;
  color: white;
  width: 10rem;
  height: 3rem;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all ease 0.3s;

  &:hover {
    background-color: #3d3d3d;
  }
`;

export default RegisterTermsOfService;
