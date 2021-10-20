import react, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Default, media } from '../../lib/Media';
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
        펜타토닉 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본
        약관은 다양한 펜타토닉 서비스의 이용과 관련하여 펜타토닉 서비스를
        제공하는 펜타토닉 주식회사(이하 ‘펜타토닉’)와 이를 이용하는 펜타토닉
        서비스 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러
        여러분의 펜타토닉 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고
        있습니다. 펜타토닉 서비스를 이용하시거나 펜타토닉 서비스 회원으로
        가입하실 경우 여러분은 본 약관 및 관련 운영 정책을 확인하거나 동의하게
        되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다.
        <br />
        <br />
        개인정보보호법에 따라 펜타토닉에 회원가입 신청하시는 분께 수집하는
        개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및
        이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니
        자세히 읽은 후 동의하여 주시기 바랍니다.
        <br />
        <br />
        1. 수집하는 개인정보 이용자는 회원가입을 하지 않아도 정보 검색, 뉴스
        보기 등 대부분의 펜타토닉 서비스를 회원과 동일하게 이용할 수 있습니다.
        이용자가 메일, 캘린더, 카페, 블로그 등과 같이 개인화 혹은 회원제
        서비스를 이용하기 위해 회원가입을 할 경우, 펜타토닉는 서비스 이용을 위해
        필요한 최소한의 개인정보를 수집합니다.
        <br />
        <br />
        회원가입 시점에 펜타토닉가 이용자로부터 수집하는 개인정보는 아래와
        같습니다.
        <br />
        <br /> - 회원 가입 시에 ‘아이디, 비밀번호, 이름, 생년월일, 성별,
        휴대전화번호’를 필수항목으로 수집합니다. 만약 이용자가 입력하는
        생년월일이 만14세 미만 아동일 경우에는 법정대리인 정보(법정대리인의
        이름, 생년월일, 성별, 중복가입확인정보(DI), 휴대전화번호)를 추가로
        수집합니다. 그리고 선택항목으로 이메일 주소, 프로필 정보를 수집합니다.
        <br />
        <br />- 단체아이디로 회원가입 시 단체아이디, 비밀번호, 단체이름,
        이메일주소, 휴대전화번호를 필수항목으로 수집합니다. 그리고 단체
        대표자명을 선택항목으로 수집합니다. 서비스 이용 과정에서 이용자로부터
        수집하는 개인정보는 아래와 같습니다. NAVER 내의 개별 서비스 이용, 이벤트
        응모 및 경품 신청 과정에서 해당 서비스의 이용자에 한해 추가 개인정보
        수집이 발생할 수 있습니다. 추가로 개인정보를 수집할 경우에는 해당
        개인정보 수집 시점에서 이용자에게 ‘수집하는 개인정보 항목, 개인정보의
        수집 및 이용목적, 개인정보의 보관기간’에 대해 안내 드리고 동의를
        받습니다.
        <br />
        <br />
        서비스 이용 과정에서 IP 주소, 쿠키, 서비스 이용 기록, 기기정보,
        위치정보가 생성되어 수집될 수 있습니다. 또한 이미지 및 음성을 이용한
        검색 서비스 등에서 이미지나 음성이 수집될 수 있습니다. <br /> <br />
        구체적으로 <br /> <br />
        1) 서비스 이용 과정에서 이용자에 관한 정보를 자동화된 방법으로 생성하여
        이를 저장(수집)하거나,
        <br /> <br />
        2) 이용자 기기의 고유한 정보를 원래의 값을 확인하지 못 하도록 안전하게
        변환하여 수집합니다. 서비스 이용 과정에서 위치정보가 수집될 수 있으며,
        펜타토닉에서 제공하는 위치기반 서비스에 대해서는 '펜타토닉 위치정보
        이용약관'에서 자세하게 규정하고 있습니다. 이와 같이 수집된 정보는
        개인정보와의 연계 여부 등에 따라 개인정보에 해당할 수 있고, 개인정보에
        해당하지 않을 수도 있습니다.
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
          checked={check}
          onChange={(e) => {
            setCheck(e.target.checked);
          }}
        />
      </TermsCheckContainer>
      <ErrorContainer>
        {error ? <ErrorMessage>이용약관에 동의해주세요</ErrorMessage> : null}
      </ErrorContainer>
      <ButtonContainer>
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
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 65vh;
`;

const TermsContainer = styled.div`
  width: 75%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  padding: 1rem 1rem;
  overflow-y: scroll;
  height: 46vh;

  ${media.small} {
    width: 85%;
    font-size: 0.8rem;
  }
`;

const TermsQuestion = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 1rem;

  ${media.small} {
    font-size: 0.9rem;
  }
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
  width: 75%;
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

const ButtonContainer = styled.div`
  position: absolute;
  width: 50%;
  min-width: 30rem;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${media.small} {
    width: 85%;
    min-width: 85%;
    justify-content: space-between;
  }
`;

const CustomButton = styled.button`
  background-color: black;
  border: none;
  color: white;
  width: 12rem;
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

  ${media.small} {
    width: 45%;
    height: 3rem;
    font-size: 0.9rem;
  }
`;

export default RegisterTermsOfService;
