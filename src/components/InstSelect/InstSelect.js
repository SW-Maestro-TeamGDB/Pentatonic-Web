import react, { useCallback } from 'react';
import styled from 'styled-components';
import { media } from '../../lib/Media';
import InstButton from '../InstButton/InstButton';

const InstSelect = (props) => {
  const { inst, setSelectInst, selectInst } = props;

  const showInst = useCallback(() => {
    return inst.map((v, i) => {
      return (
        <InstButton
          session={v}
          setSelectInst={setSelectInst}
          selectInst={selectInst}
          key={'selectInst' + i}
          selected={selectInst.indexOf(v) === -1 ? false : true}
        />
      );
    });
  }, [selectInst, inst]);

  return <InstConatiner>{showInst()}</InstConatiner>;
};

const InstConatiner = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  margin-top: 2.5rem;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
`;

export default InstSelect;
