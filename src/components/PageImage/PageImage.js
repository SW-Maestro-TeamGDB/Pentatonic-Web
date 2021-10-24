import react from 'react';
import styled from 'styled-components';
import { media } from '../../lib/Media';

const PageImage = (props) => {
  const { title, imgUrl, position, desc } = props;
  const pose = position ? position : 'center';

  return (
    <PageImageContainer>
      <CustomImg imgUrl={imgUrl} pose={pose} />
      <PageTitle>{title}</PageTitle>
      {desc ? <PageDesc>{desc}</PageDesc> : null}
    </PageImageContainer>
  );
};

const CustomImg = styled.div`
  background: url(${(props) => props.imgUrl});
  background-repeat: no-repeat;
  background-position: ${(props) => props.pose} center;
  background-size: 100%;
  overflow: hidden;

  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;

  height: 18rem;
  width: 100%;

  ${media.small} {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    background-image: url(${(props) => props.imgUrl});
    background-size: cover;
    width: 100%;
    height: 20rem;
  }
`;

const PageImageContainer = styled.div`
  height: 18rem;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  border: 2px solid rgb(255, 255, 255);
  overflow: hidden;

  ${CustomImg} {
    filter: brightness(50%) blur(2px);
  }

  ${media.small} {
    width: 120%;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border: none;
    height: 20rem;

    ${CustomImg} {
      filter: brightness(60%) blur(2px);
    }
  }
`;

const PageTitle = styled.div`
  font-size: 3rem;
  font-weight: 900;
  color: white;
  letter-spacing: -0.2rem;
  position: absolute;
  top: 30%;

  ${media.small} {
    width: 100%;
    top: 40%;
    font-size: 2.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const PageDesc = styled.div`
  font-size: 16px;
  position: absolute;
  color: white;
  bottom: 15%;
  display: flex;
  justify-content: center;
  width: 100%;
  font-weight: 700;

  ${media.small} {
    font-size: 0.9rem;
    bottom: 15%;
    display: flex;
    justify-content: center;
    width: 100%;
  }
`;

export default PageImage;
