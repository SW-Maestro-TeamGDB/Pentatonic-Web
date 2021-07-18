import react from 'react';
import styled from 'styled-components';
import { Default } from '../../lib/Media';
import { Link } from 'react-router-dom';
import searchIcon from '../../images/searchIcon.svg';

const SearchBar = ({ props }) => {
  return (
    <SearchBarContainer>
      <CustomInput />
      <CustomIcon src={searchIcon} />
    </SearchBarContainer>
  );
};

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 70%;
  border-radius: 1rem;
  border: 1px solid rgb(150, 150, 150);
  height: 3rem;
  align-items: center;
  justify-content: space-between;
`;

const CustomInput = styled.input`
  border: none;
  width: 90%;
  height: 80%;
  outline: none;
  margin-left: 1rem;
  font-family: 'NanumSquare';
  font-size: 16px;
  font-weight: 400;
`;

const CustomIcon = styled.img`
  width: 1rem;
  margin-right: 2rem;
  cursor: pointer;
`;

export default SearchBar;
