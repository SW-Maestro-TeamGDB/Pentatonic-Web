import react from 'react';
import styled from 'styled-components';
import { Space, Dropdown, Menu, Button } from 'antd';
import { media } from '../../lib/Media';
import SearchIcon from '../../images/SearchIcon.svg';

const GridContainer = (props) => {
  const {
    children,
    width,
    templateColumn,
    autoFill,
    columnGap = '1rem',
    rowGap = '1rem',
  } = props;

  return (
    <Container
      width={width}
      templateColumn={templateColumn}
      columnGap={columnGap}
      rowGap={rowGap}
      autoFill={autoFill}
    >
      {children}
    </Container>
  );
};

const Container = styled.div`
  width: ${(props) => (props.width ? props.width : '100%')};
  height: auto;
  display: grid;
  grid-template-columns: ${(props) =>
    props.templateColumn
      ? `repeat(${props.autoFill ? 'auto-fill' : 'auto-fit'}, minmax(${
          props.templateColumn
        }, 1fr))`
      : '1fr 1fr'};
  grid-column-gap: ${(props) => props.columnGap};
  grid-row-gap: ${(props) => props.rowGap};
`;

export default GridContainer;
