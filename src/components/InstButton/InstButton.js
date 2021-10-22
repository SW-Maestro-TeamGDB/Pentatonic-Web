import react, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { media } from '../../lib/Media';
import SearchIcon from '../../images/SearchIcon.svg';
import { changeSessionNameToKorean } from '../../lib/changeSessionNameToKorean';
import { sessionIconMatch } from '../../lib/sessionIconMatch';

const InstButton = (props) => {
  const {
    session,
    instURI,
    setSelectInst,
    selectInst,
    selected,
    selectInstURI,
    setSelectInstURI,
    icon,
  } = props;

  const onClickSessionItem = () => {
    if (selected) {
      setSelectInst([...selectInst.filter((v) => v !== session)]);
      setSelectInstURI([...selectInstURI.filter((v) => v !== instURI)]);
    } else {
      setSelectInst([...selectInst, session]);
      setSelectInstURI([...selectInstURI, instURI]);
    }
  };

  return (
    <InstButtonContainer
      onClick={() => {
        onClickSessionItem();
      }}
      selected={selected}
      icon={icon}
    >
      {icon ? (
        <SessionIcon src={sessionIconMatch(session)} selected={selected} />
      ) : null}
      <SessionText selected={selected} icon={icon}>
        {changeSessionNameToKorean(session)}
      </SessionText>
    </InstButtonContainer>
  );
};

const InstButtonContainer = styled.div`
  display: flex;
  width: 100%;

  padding: ${(props) => (props.icon ? '0.7rem 0' : '0.5rem 0')};
  border-radius: 0.5rem;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  background-color: ${(props) =>
    props.selected ? 'rgba(98, 54, 255, 0.65)' : 'white'};
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.selected ? 'rgba(98, 54, 255, 0.65)' : 'rgba(98, 54, 255, 0.12)'};
  }

  ${media.small} {
    box-shadow: 0 0 3px 0 rgba(98, 54, 255, 0.4);
  }
`;

const SessionText = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  margin-left: ${(props) => (props.icon ? '1rem' : null)};
  color: ${(props) => (props.selected ? 'white' : 'gray')};

  ${media.small} {
    font-size: 0.9rem;
  }
`;

const SessionIcon = styled.img`
  width: 2rem;

  opacity: ${(props) => (props.selected ? '1' : '0.5')};
  filter: ${(props) => (props.selected ? 'invert(100%)' : null)};

  ${media.small} {
    width: 1.3rem;
  }
`;

export default InstButton;
