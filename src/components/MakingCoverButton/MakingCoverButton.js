import react from 'react';
import styled from 'styled-components';
import { media } from '../../lib/Media';
import { Link } from 'react-router-dom';
import MakingIcon from '../../images/MakingIcon.svg';

const MakingCoverButton = (props) => {
  const { link, title, icon = 'true' } = props;
  return (
    <MakingCoverLink to={link}>
      <ButtonContainer>
        {title}
        {icon ? <MakingIconImg src={MakingIcon} /> : null}
      </ButtonContainer>
    </MakingCoverLink>
  );
};

const MakingCoverLink = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MakingIconImg = styled.img`
  width: 1rem;
  margin-left: 0.5rem;
  filter: invert(100%);
`;

const ButtonContainer = styled.div`
  cursor: pointer;
  min-width: 12em;
  padding: 0.8vh 0.7vw;
  color: white;
  background-image: linear-gradient(to right, #6236ff, #9b66ff);
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 16px;
  font-weight: 700;
`;

export default MakingCoverButton;
