import react from 'react';
import styled from 'styled-components';
import { Space, Dropdown, Menu, Button } from 'antd';
import { media } from '../../lib/Media';
import SearchIcon from '../../images/SearchIcon.svg';

const GridContainer = (props) => {
  const { children, width, templateColumn } = props;
  return (
    <Container width={width} templateColumn={templateColumn}>
      {children}
    </Container>
  );
};

const Container = styled.div`
  width: ${(props) => (props.width ? props.width : '100%')};
  height: auto;
  display: grid;
  grid-template-columns: ${(props) =>
    props.templateColumn ? '1fr 1fr' : 'repeat(auto-fit, minmax(200px, 1fr))'};
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
`;

export default GridContainer;
