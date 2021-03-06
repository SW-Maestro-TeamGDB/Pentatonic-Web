import react, { useState, useEffect } from 'react';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import {
  GET_CURRENT_USER,
  GET_USER_INFORM,
  currentUserVar,
  isLoggedInVar,
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
import Logo from '../../images/Logo/Logo.png';

const GET_MY_INFO = gql`
  query Query {
    getMyInfo {
      id
      username
      profileURI
      prime
      type
    }
  }
`;

const Header = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [modalToggle, setModalToggle] = useState(false);
  const { data } = useQuery(GET_CURRENT_USER, { fetchPolicy: 'network-only' });

  const [getMyInfo, getMyInfoResult] = useLazyQuery(GET_MY_INFO, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      currentUserVar(data.getMyInfo);
    },
  });

  const [getUserInform, getUserInformResult] = useLazyQuery(GET_USER_INFORM, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      console.log(data);
      // sessionStorage.setItem('userInfo', JSON.stringify(data.getUserInfo));
      currentUserVar(data.getUserInfo);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onClickLoginButton = () => {
    setModalToggle(true);
  };

  const onClickLogoutButton = () => {
    sessionStorage.clear();
    isLoggedInVar(false);
    currentUserVar(null);
    if (menuToggle) setMenuToggle(false);
  };

  const showDrawer = () => {
    setMenuToggle(true);
  };

  const onClose = () => {
    setMenuToggle(false);
  };

  const onClickRegisterButton = (bool) => {
    setMenuToggle(bool);
    setModalToggle(bool);
  };

  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  });

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      getMyInfo();
    }
  }, [sessionStorage.getItem('token')]);

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
            <MobileMenu
              onClose={onClose}
              data={data?.user}
              onClickLoginButton={onClickLoginButton}
              onClickLogoutButton={onClickLogoutButton}
            />
          </CustomDrawer>
          <MobileMenuButton
            onClick={() => {
              setMenuToggle(!menuToggle);
            }}
          >
            ???
          </MobileMenuButton>
          <LogoContainer>
            <LogoLink to="/">
              <LogoImage src={Logo} />
            </LogoLink>
          </LogoContainer>
          <AuthModal
            modalToggle={modalToggle}
            setModalToggle={onClickRegisterButton}
          />
        </Mobile>
        <Default>
          <HeaderContents>
            <LogoContainer>
              <LogoLink to="/">
                <LogoImage src={Logo} />
              </LogoLink>
            </LogoContainer>
            <MenuContainer>
              <Menu />
            </MenuContainer>
            <UserContainer>
              {data?.user ? (
                <CustomDropdown
                  overlay={<MyMenu />}
                  trigger={['click']}
                  placement="bottomCenter"
                  getPopupContainer={(trigger) => trigger.parentNode}
                >
                  <ProfileContainer>
                    <UserImg src={data?.user.profileURI} />
                    <UserName>{data?.user.username}</UserName>
                  </ProfileContainer>
                </CustomDropdown>
              ) : (
                <LoginButton onClick={() => onClickLoginButton()}>
                  ?????????
                </LoginButton>
              )}
            </UserContainer>
          </HeaderContents>
          <AuthModal
            modalToggle={modalToggle}
            setModalToggle={setModalToggle}
          />
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

const LogoImage = styled.img`
  width: 160px;
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
  margin-right: 0%;
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
  object-fit: cover;

  ${media.medium} {
    height: 40px;
  }
`;

const UserName = styled.div`
  font-size: 14px;
  font-weight: 600;
  line-height: 1.13;
  letter-spacing: -1px;

  ${media.medium} {
    display: none;
  }
`;

const HeaderContainer = styled.div`
  background-color: #ffffff;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);

  // ????????? ??????
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;

  ${media.small} {
    background-color: white;
    text-align: right;
    display: flex;

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
  padding: 0.4rem 1rem;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 700;
  color: rgba(110, 101, 170, 0.8);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;
  border: 2px solid rgba(110, 101, 170, 0.6);

  line-height: 1.13;
  letter-spacing: -0.4px;

  &:hover {
    color: rgba(110, 101, 170, 1);
    border: 2px solid rgba(110, 101, 170, 0.8);
  }

  ${media.medium} {
    padding: 0.4rem 0.7rem;
  }
`;

const MobileMenuButton = styled.div`
  position: absolute;
  left: 5vw;
  font-size: 1.5rem;
  color: black;
`;

const LogoContainer = styled.div`
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
