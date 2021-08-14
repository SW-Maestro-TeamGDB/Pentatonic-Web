import react, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { media } from '../../lib/Media';
import SearchIcon from '../../images/SearchIcon.svg';

const InstButton = (props) => {
  const { session, setSelectInst, selectInst } = props;
  const [selected, setSelected] = useState(selectInst.indexOf(session));

  const onClickSessionItem = () => {
    if (selected) {
      setSelected(false);
      setSelectInst([...selectInst.filter((v) => v !== session)]);
    } else {
      setSelected(true);
      setSelectInst([...selectInst, session]);
    }
  };

  return (
    <InstButtonContainer
      onClick={() => {
        onClickSessionItem();
      }}
      selected={selected}
    >
      {session}
    </InstButtonContainer>
  );
};

const InstButtonContainer = styled.div`
  display: flex;
  width: 100%;
  font-size: 1.2rem;
  font-weight: 700;
  padding: 0.5rem 0;
  border-radius: 0.5rem;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  justify-content: center;
  color: ${(props) => (!props.selected ? 'white' : 'gray')};
  background-color: ${(props) =>
    !props.selected ? 'rgba(98, 54, 255, 0.7)' : 'white'};
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      !props.selected ? 'rgba(98, 54, 255, 0.7)' : 'rgba(98, 54, 255, 0.12)'};
  }
`;

export default InstButton;
