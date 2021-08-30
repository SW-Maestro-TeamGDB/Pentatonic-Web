import react, { useState, useEffect } from 'react';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import {
  GET_CURRENT_USER,
  GET_USER_INFORM,
  currentUserVar,
} from '../../apollo/cache';
import { useMediaQuery } from 'react-responsive';
import { Dropdown, Drawer, Modal, Select } from 'antd';
import { Default, Mobile, media } from '../../lib/Media';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MyMenu from '../MyMenu';
import MobileMenu from '../MobileMenu/MobileMenu';
import AuthModal from '../AuthModal';
import Menu from '../Menu';

const Header = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [modalToggle, setModalToggle] = useState(false);
  const { data } = useQuery(GET_CURRENT_USER);

  const [getUserInform, getUserInformResult] = useLazyQuery(GET_USER_INFORM, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      localStorage.setItem('userInfo', JSON.stringify(data.getUserInfo));
      currentUserVar(data.getUserInfo);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onClickLoginButton = () => {
    setModalToggle(true);
  };

  const showDrawer = () => {
    setMenuToggle(true);
  };
  const onClose = () => {
    setMenuToggle(false);
  };

  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  });

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUserInform();
    }
  }, [localStorage.getItem('token')]);

  return (
    <Fixed>
      <HeaderContainer>
        <Mobile>
          <CustomDrawer
            placement="left"
            closable={false}
            onClose={onClose}
            visible={menuToggle}
          >
            <MobileMenu onClose={onClose} />
          </CustomDrawer>
          <MobileMenuButton
            onClick={() => {
              setMenuToggle(!menuToggle);
            }}
          >
            ☰
          </MobileMenuButton>
          <LogoContainer>
            <LogoLink to="/">Pentatonic</LogoLink>
          </LogoContainer>
        </Mobile>
        <Default>
          <HeaderContents>
            <LogoContainer>
              <LogoLink to="/">Pentatonic</LogoLink>
            </LogoContainer>
            <MenuContainer>
              <Menu />
            </MenuContainer>
            <UserContainer>
              {data?.user ? (
                <CustomDropdown
                  overlay={MyMenu}
                  trigger={['click']}
                  placement="bottomCenter"
                  getPopupContainer={(trigger) => trigger.parentNode}
                >
                  <ProfileContainer>
                    <UserImg src={data?.user?.profileURI} />
                    <UserName>{data?.user?.username}</UserName>
                  </ProfileContainer>
                </CustomDropdown>
              ) : (
                <LoginButton onClick={() => onClickLoginButton()}>
                  로그인 / 회원가입
                </LoginButton>
              )}
            </UserContainer>
            <AuthModal
              modalToggle={modalToggle}
              setModalToggle={setModalToggle}
            />
          </HeaderContents>
        </Default>
      </HeaderContainer>
    </Fixed>
  );
};

const Fixed = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 4;
`;

const HeaderContents = styled.div`
  width: 60%;
  min-width: 1000px;
  display: flex;
  justify-content: space-between;

  ${media.medium} {
    width: 90%;
    min-width: 600px;
  }
`;

const UserContainer = styled.div`
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 3%;
`;

const CustomDropdown = styled(Dropdown)`
  position: relative;
  display: flex;
  align-items: center;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const CustomDrawer = styled(Drawer)``;

const UserImg = styled.img`
  height: 32px;
  border-radius: 30px;
  margin-right: 10px;
`;

const UserName = styled.div`
  font-size: 18px;
  font-weight: 600;
  line-height: 1.13;
  letter-spacing: -0.4px;
`;

const HeaderContainer = styled.div`
  background-color: #ffffff;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);

  // 드래그 방지
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;

  ${media.small} {
    background-color: white;
    text-align: right;
    display: flex;
    height: 8vh;
    justify-content: center;
    align-items: center;
    color: black;
  }
`;

const LoginButton = styled.div`
  border: none;
  background-color: transparent;
  color: black;
  width: auto;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;

  line-height: 1.13;
  letter-spacing: -0.4px;

  &:hover {
    color: rgb(60, 60, 60);
  }
`;

const MobileMenuButton = styled.div`
  position: absolute;
  left: 5vw;
  font-size: 1.5rem;
  color: black;
`;

const LogoContainer = styled.div`
  margin-left: 1.5vw;
  display: flex;
  align-items: center; ;
`;

const LogoLink = styled(Link)`
  font-size: 28px;
  font-weight: 900;
  color: #6236ff;
  letter-spacing: -1.5px;

  ${media.small} {
    color: black;
    font-size: 2rem;
    font-weight: 900;
  }

  &:hover {
    color: #6236ff;
  }
`;

const LoginContainer = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  margin-right: 1.5vw;
  cursor: pointer;
`;

const MenuContainer = styled.div`
  width: 70%;
  position: relative;
`;

const MenuLink = styled(Link)`
  color: black;
  padding: 1vh 0;
  text-align: center;
  font-weight: 400;

  &:hover {
    background-color: rgb(230, 230, 230);
  }
`;

export default Header;
