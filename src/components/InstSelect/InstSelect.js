import react, { useCallback } from 'react';
import styled from 'styled-components';
import { media } from '../../lib/Media';
import InstButton from '../InstButton/InstButton';

const InstSelect = (props) => {
  const {
    sessionData,
    setSelectInst,
    selectInst,
    selectInstURI,
    setSelectInstURI,
    icon = false,
  } = props;

  const showInst = useCallback(() => {
    if (sessionData?.length > 0)
      return sessionData.map((v, i) => {
        return (
          <InstButton
            session={v.position}
            instURI={v.instURI}
            selectInst={selectInst}
            setSelectInst={setSelectInst}
            selectInstURI={selectInstURI}
            setSelectInstURI={setSelectInstURI}
            key={'selectInst' + i}
            selected={selectInst.indexOf(v.position) === -1 ? false : true}
            icon={icon}
          />
        );
      });
  }, [selectInst, sessionData]);

  return <InstConatiner icon={icon}>{showInst()}</InstConatiner>;
};

const InstConatiner = styled.div`
  width: 100%;
  height: auto;
  display: grid;

  grid-template-columns: repeat(
    auto-fill,
    minmax(${(props) => (props.icon ? '130px' : '120px')}, 1fr)
  );
  margin-top: 2.5rem;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
`;

export default InstSelect;
