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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const Terms = () => {
    return (
      <>
        <b>펜타토닉 이용약관 </b>
        <br />
        <br />
        펜타토닉('https://www.penta-tonic.com/'이하 '펜타토닉')은(는) 「개인정보
        보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을
        신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보
        처리방침을 수립·공개합니다. <br />
        <br />○ 이 개인정보처리방침은 2021년 10월 28부터 적용됩니다. <br />
        <br />
        제1조(개인정보의 처리 목적) <br /> <br />
        펜타토닉('https://www.penta-tonic.com/'이하 '펜타토닉')은(는) 다음의
        목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의
        목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는
        「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를
        이행할 예정입니다. <br />
        <br />
        1. 홈페이지 회원가입 및 관리 회원 가입의사 확인, 회원제 서비스 제공에
        따른 본인 식별·인증, 서비스 부정이용 방지 목적으로 개인정보를
        처리합니다. <br />
        2. 재화 또는 서비스 제공 본인인증을 목적으로 개인정보를 처리합니다.
        <br /> 3. 마케팅 및 광고에의 활용 이벤트 및 광고성 정보 제공 및 참여기회
        제공 , 접속빈도 파악 또는 회원의 서비스 이용에 대한 통계 등을 목적으로
        개인정보를 처리합니다.
        <br />
        <br /> 제2조(개인정보의 처리 및 보유 기간) <br /> <br /> ①
        펜타토닉은(는) 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터
        개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를
        처리·보유합니다. <br /> <br />
        제3조(정보주체와 법정대리인의 권리·의무 및 그 행사방법) <br /> <br />①
        정보주체는 펜타토닉에 대해 언제든지 개인정보 열람·정정·삭제·처리정지
        요구 등의 권리를 행사할 수 있습니다. <br />② 제1항에 따른 권리
        행사는펜타토닉에 대해 「개인정보 보호법」 시행령 제41조제1항에 따라
        서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 펜타토닉은(는)
        이에 대해 지체 없이 조치하겠습니다. <br /> ③ 제1항에 따른 권리 행사는
        정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수
        있습니다.이 경우 “개인정보 처리 방법에 관한 고시(제2020-7호)” 별지
        제11호 서식에 따른 위임장을 제출하셔야 합니다. <br /> ④ 개인정보 열람 및
        처리정지 요구는 「개인정보 보호법」 제35조 제4항, 제37조 제2항에 의하여
        정보주체의 권리가 제한 될 수 있습니다. <br /> ⑤ 개인정보의 정정 및 삭제
        요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는
        그 삭제를 요구할 수 없습니다. <br /> ⑥ 펜타토닉은(는) 정보주체 권리에
        따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한
        자가 본인이거나 정당한 대리인인지를 확인합니다. <br /> <br />
        제4조(처리하는 개인정보의 항목 작성) <br /> <br />① 펜타토닉은(는)
        다음의 개인정보 항목을 처리하고 있습니다. <br /> 1. 홈페이지 회원가입 및
        관리 필수항목 : 휴대전화번호, 비밀번호, 로그인ID <br /> <br />
        제5조(개인정보의 파기) <br /> <br />① 펜타토닉은(는) 개인정보 보유기간의
        경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당
        개인정보를 파기합니다. <br /> ② 정보주체로부터 동의받은 개인정보
        보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에
        따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의
        데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다. <br /> ③
        개인정보 파기의 절차 및 방법은 다음과 같습니다. <br /> <br /> 1.
        파기절차 펜타토닉은(는) 파기 사유가 발생한 개인정보를 선정하고,
        펜타토닉의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.{' '}
        <br /> 2. 파기방법 전자적 파일 형태의 정보는 기록을 재생할 수 없는
        기술적 방법을 사용합니다 <br /> <br />
        제6조(권익침해 구제방법) <br /> <br /> 정보주체는 개인정보침해로 인한
        구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원
        개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이
        밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기
        바랍니다. <br /> <br />
        1. 개인정보분쟁조정위원회 : (국번없이) 1833-6972 (www.kopico.go.kr){' '}
        <br />
        2. 개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr) <br />
        3. 대검찰청 : (국번없이) 1301 (www.spo.go.kr) <br />
        4. 경찰청 : (국번없이) 182 (ecrm.cyber.go.kr) <br /> <br />
        「개인정보보호법」제35조(개인정보의 열람), 제36조(개인정보의 정정·삭제),
        제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대 하여 공공기관의
        장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은 자는
        행정심판법이 정하는 바에 따라 행정심판을 청구할 수 있습니다. ※
        행정심판에 대해 자세한 사항은 중앙행정심판위원회(www.simpan.go.kr)
        홈페이지를 참고하시기 바랍니다. <br /> <br />
        제7조(개인정보 처리방침 변경) <br /> <br />① 이 개인정보처리방침은
        2021년 10월 28부터 적용됩니다.
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
  background-color: rgba(98, 54, 255, 0.9);
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
    background-color: rgba(98, 54, 255, 1);
  }

  ${media.small} {
    width: 45%;
    height: 3rem;
    font-size: 0.9rem;
  }
`;

export default RegisterTermsOfService;
