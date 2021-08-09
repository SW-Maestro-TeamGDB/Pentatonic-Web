import react from 'react';
import styled from 'styled-components';
import { media } from '../../lib/Media';

const PageImage = ({ title, imgUrl, position }) => {
  // 포지션 정의 안할경우 기본 center
  const pose = position ? position : 'center';

  return (
    <PageImageContainer>
      <CustomImg imgUrl={imgUrl} pose={pose} />
      <PageTitle>{title}</PageTitle>
    </PageImageContainer>
  );
};

const CustomImg = styled.div`
  background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 10%,
      rgba(255, 255, 255, 0.25) 35%,
      rgba(255, 255, 255, 0.5) 60%,
      rgba(255, 255, 255, 0.75) 85%,
      rgba(255, 255, 255, 1) 100%
    ),
    url(${(props) => props.imgUrl});
  background-repeat: no-repeat;
  background-position: ${(props) => props.pose} center;
  background-size: 100%;

  border-top-left-radius: 3rem;
  border-top-right-radius: 3rem;

  height: 15rem;
  width: 100%;
`;

const PageImageContainer = styled.div`
  height: 15rem;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  ${CustomImg} {
    filter: brightness(70%);
  }
`;

const PageTitle = styled.div`
  font-size: 3vw;
  font-weight: 900;
  color: white;
  letter-spacing: -0.2rem;
  position: absolute;
`;

export default PageImage;
