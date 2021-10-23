import react, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import UserAvatar from '../../images/UserAvatar.svg';

const MobileMenu = (props) => {
  const { onClose, data, onClickLoginButton, onClickLogoutButton } = props;

  return (
    <MenuContents>
      {data ? (
        <UserContainer>
          <UserDataWrapper>
            <MyProfileImg src={data.profileURI} />
            <UserDataContainer>
              <Username to={`/profile/${data.id}`} onClick={() => onClose()}>
                {data.username}
              </Username>
              <UserId>@{data.id}</UserId>
            </UserDataContainer>
          </UserDataWrapper>
        </UserContainer>
      ) : (
        <LoginContainer
          onClick={() => {
            onClickLoginButton();
          }}
        >
          <LoginProfileImg src={UserAvatar} />
          로그인 / 회원가입
        </LoginContainer>
      )}
      <MenuWrapper>
        <MenuLink to="/lounge" onClick={() => onClose()}>
          라운지
        </MenuLink>
        <SubMenuLink to="/lounge/weekly" onClick={() => onClose()}>
          위클리 챌린지
        </SubMenuLink>
        <SubMenuLink to="/lounge/band" onClick={() => onClose()}>
          밴드 커버
        </SubMenuLink>
        <SubMenuLink to="/lounge/solo" onClick={() => onClose()}>
          솔로 커버
        </SubMenuLink>
        <SubMenuLink to="/lounge/free" onClick={() => onClose()}>
          자유곡 커버
        </SubMenuLink>
        <Divider />
        <MenuLink to="/studio" onClick={() => onClose()}>
          스튜디오
        </MenuLink>
        <SubMenuLink to="/studio/band" onClick={() => onClose()}>
          밴드 커버녹음
        </SubMenuLink>
        <SubMenuLink to="/studio/solo" onClick={() => onClose()}>
          솔로 커버녹음
        </SubMenuLink>
        <Divider />
        <MenuLink to="/artist" onClick={() => onClose()}>
          아티스트
        </MenuLink>
        <SubMenuLink to="/artist/rank/band" onClick={() => onClose()}>
          밴드 랭킹
        </SubMenuLink>
        <SubMenuLink to="/artist/rank/artist" onClick={() => onClose()}>
          아티스트 랭킹
        </SubMenuLink>
      </MenuWrapper>
      <Divider />
      {data ? (
        <MenuWrapper>
          <SubMenuLink to={`/profile/${data.id}`} onClick={() => onClose()}>
            마이페이지
          </SubMenuLink>
          <SubMenuLink to="/library" onClick={() => onClose()}>
            라이브러리
          </SubMenuLink>
          <LogoutButton onClick={() => onClickLogoutButton()}>
            로그아웃
          </LogoutButton>
        </MenuWrapper>
      ) : null}
    </MenuContents>
  );
};

const UserDataWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-left: 10px;
  padding: 3vh 0;
`;

const UserContainer = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1vh;
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 3vh 0;
  background-color: #fff;

  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: -1px;
`;

const UserDataContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserId = styled.div`
  color: #aaa;
  font-size: 0.7rem;

  width: 9rem;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Username = styled(Link)`
  font-size: 1rem;
  font-weight: 700;
  width: 9rem;

  color: #000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    color: #000;
  }

  &:focus {
    color: #000;
  }
`;

const LoginProfileImg = styled.img`
  width: 8vw;
  height: 8vw;
  opacity: 0.5;
  margin-right: 5vw;
`;

const MyProfileImg = styled.img`
  width: 15vw;
  height: 15vw;
  opacity: 0.8;
  margin-right: 3vw;
  border-radius: 100%;
`;

const MenuContents = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 3;
  align-items: flex-start;
  color: black;
  background-color: white;
  left: 0;
  top: 0;

  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(245, 245, 245, 1);

  position: absolute;
`;

const MenuWrapper = styled.div`
  flex-direction: column;
  display: flex;
  margin-top: 1vh;
  width: 100%;
`;

const Divider = styled.div`
  width: 100%;
  border-bottom: 0.1px solid rgba(230, 230, 230, 0.8);
  margin: 1.5vh 0;
`;

const MenuLink = styled(Link)`
  color: #666;
  margin: 0.8vh 0;
  font-weight: 600;
  font-size: 1rem;
  padding-left: 20px;
  letter-spacing: -1px;

  &:hover {
    color: #666;
  }

  &:focus {
    color: #666;
  }
`;

const SubMenuLink = styled(Link)`
  color: black;
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0.3vh 0;
  padding-left: 20px;
  letter-spacing: -1px;

  &:hover {
    color: black;
  }

  &:focus {
    color: black;
  }
`;

const LogoutButton = styled.div`
  color: black;
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0.3vh 0;
  padding-left: 20px;
  letter-spacing: -1px;
  cursor: pointer;
`;

export default MobileMenu;
