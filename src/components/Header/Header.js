import react, { useState, useEffect } from 'react';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import {
  GET_CURRENT_USER,
  GET_USER_INFORM,
  currentUserVar,
} from '../../apollo/cache';
import { useMediaQuery } from 'react-responsive';
import { Dropdown, Drawer, Modal } from 'antd';
import { Default, Mobile, media } from '../../lib/Media';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MyMenu from '../MyMenu';
import MobileMenu from '../MobileMenu/MobileMenu';
import AuthModal from '../AuthModal';

const Header = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [modalToggle, setModalToggle] = useState(false);
  const { data } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: 'network-only',
    onError: (error) => {},
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const [getUserInform, getUserInformResult] = useLazyQuery(GET_USER_INFORM, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      currentUserVar(data.getPersonalInformation);
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

  useEffect(() => {
    console.log(data);
  }, [data]);

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
        </Mobile>
        <LogoContainer>
          <LogoLink to="/">Pentatonic</LogoLink>
        </LogoContainer>
        <Default>
          {data?.user ? (
            <>
              <CustomDropdown
                overlay={MyMenu}
                trigger={['click']}
                placement="bottomCenter"
              >
                <ProfileContainer>
                  <UserImg src={data?.user?.profileURI} />
                  <UserName>{data?.user?.username}</UserName>
                </ProfileContainer>
              </CustomDropdown>
            </>
          ) : (
            <LoginButton onClick={() => onClickLoginButton()}>
              로그인 / 회원가입
            </LoginButton>
          )}
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

const CustomDropdown = styled(Dropdown)`
  position: absolute;
  right: 2vw;
  height: 100%;
  display: flex;
  align-items: center;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const CustomDrawer = styled(Drawer)``;

const UserImg = styled.img`
  height: 60%;
  border-radius: 100%;
  margin-right: 1rem;
`;

const UserName = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;

const HeaderContainer = styled.div`
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;

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

const LoginButton = styled.button`
  right: 1vw;
  position: absolute;
  border: none;
  background-color: transparent;
  color: white;
  width: auto;
  border-radius: 6px;
  height: 60%;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: lightgray;
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
`;

const LogoLink = styled(Link)`
  font-size: 1.8rem;
  font-weight: bolder;
  color: white;

  ${media.small} {
    color: black;
    font-size: 2rem;
    font-weight: 900;
  }
`;

const LoginContainer = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  margin-right: 1.5vw;
  cursor: pointer;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  color: black;
  background-color: white;
  right: 1vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  padding: 1.5vh 0;
  width: 10rem;
  transform: translateY(3.5rem);
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
