import react from 'react';
import styled from 'styled-components';
import { Default } from '../../lib/Media';
import SearchIcon from '../../images/SearchIcon.svg';

const SearchBar = (props) => {
  const { placeholder } = props;
  return (
    <SearchBarContainer>
      <CustomInput placeholder={placeholder ? placeholder : null} />
      <CustomIcon src={SearchIcon} />
    </SearchBarContainer>
  );
};

const CustomInput = styled.input`
  border: none;
  width: 100%;
  height: 100%;
  outline: none;
  margin-left: 1rem;
  font-family: 'NanumSquare';
  font-size: 16px;
  font-weight: 400;
  background-color: transparent;
  position: absolute;
  padding-left: 1.5rem;
  padding-right: 7%;

  border-radius: 1rem;
  border: 3px solid rgba(98, 54, 255, 0);
  background-color: rgba(98, 54, 255, 0.03);

  outline: none;

  &:hover {
    border: 3px solid rgba(98, 54, 255, 0.05);
  }

  &:focus {
    border: 3px solid rgba(98, 54, 255, 0.1);
  }

  ::placeholder {
    font-size: 16px;
  }
`;

const SearchBarContainer = styled.div`
  padding-left: 0.5rem;
  display: flex;
  flex-direction: row;
  width: 70%;
  height: 3.5rem;
  align-items: center;
  justify-content: space-between;

  position: relative;
`;

const CustomIcon = styled.img`
  width: 1.2rem;
  cursor: pointer;
  filter: invert(38%) sepia(91%) saturate(5568%) hue-rotate(241deg)
    brightness(101%) contrast(101%);
  opacity: 0.3;
  position: absolute;
  right: 0;
`;

export default SearchBar;
