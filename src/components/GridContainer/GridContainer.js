import react from 'react';
import styled from 'styled-components';
import { Space, Dropdown, Menu, Button } from 'antd';
import { media } from '../../lib/Media';
import SearchIcon from '../../images/SearchIcon.svg';

const GridContainer = ({ children, width }) => {
  const Container = styled.div`
    width: ${width ? width : '100%'};
    height: auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    margin-top: 2.5rem;
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
  `;

  return <Container>{children}</Container>;
};

export default GridContainer;
