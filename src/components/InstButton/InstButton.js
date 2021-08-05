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

  useEffect(() => {
    console.log(selected);
  }, [selected]);

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
  padding: 0.5rem 0;
  border-radius: 0.5rem;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  justify-content: center;
  color: ${(props) => (!props.selected ? 'white' : 'gray')};
  background-color: ${(props) => (!props.selected ? 'gray' : 'white')};

  &:hover {
    background-color: ${(props) => (!props.selected ? 'gray' : '#f0f0f0')};
  }
`;

export default InstButton;
