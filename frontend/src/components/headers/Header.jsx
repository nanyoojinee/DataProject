import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTE } from '../../constants/routes/routeData';
import { useRecoilState } from 'recoil';
import { updateState, userInfoState, userTokenState } from '../../stores';
import * as API from '../../api/index';
import MobileMenu from './Mobilemenu';


export default function Header() {
  const [userToken, setUserToken] = useRecoilState(userTokenState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [isMobile, setIsMobile] = useState(false);
  const [update] = useRecoilState(updateState);

  useEffect(() => {
    if (sessionStorage.getItem('userToken')) {
      setUserToken(sessionStorage.getItem('userToken'));
    }
  }, []);

  useEffect(() => {
    const getUserInfo = async () => {
      const result = await API.get('/user');
      setUserInfo(result.data);
    };

    if (userToken) {
      getUserInfo();
    }
  }, [userToken, update]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  console.log(userInfo);

  return (
    <HeaderWrap>
      <HeaderContainer>
        <LogoBox>
          <Link to={'/'}>
            <LogoImgBox>
              <img src="/images/commons/textlogo.png" alt="사랑해 지구야 로고" />
            </LogoImgBox>
          </Link>
        </LogoBox>
        <NavigationBox>
          {!isMobile && (
            <Navigation>
              <NavMenu>
                <MenuList>
                  <Link to={ROUTE.GROUP_LIST.link}>Group</Link>
                </MenuList>
                <MenuList>
                  <Link to={'/'}>Challenge</Link>
                </MenuList>
                <MenuList>
                  <Link to={'/'}>Community</Link>
                </MenuList>
              </NavMenu>
            </Navigation>
          )}
          {userToken && (
            <InfoMenu>
              <UserName>{userInfo?.user?.nickname}</UserName>
              <CountBox>
                <span>🥤: 9</span>
              </CountBox>
              <CountBox>
                <span>♻️ : 9</span>
              </CountBox>
            </InfoMenu>
          )}
          {isMobile && <MobileMenubox><MobileMenu userInfo={userInfo} /></MobileMenubox>}
          {!isMobile && (
            <SubMenu>
              {!userToken ? (
                <>
                  <SubMenuList>
                    <SubMenuBtn btn={'stroke'}>
                      <Link to={ROUTE.LOGIN.link}>LOGIN</Link>
                    </SubMenuBtn>
                  </SubMenuList>
                  <SubMenuList>
                    <SubMenuBtn>
                      <Link to={ROUTE.JOIN.link}>JOIN</Link>
                    </SubMenuBtn>
                  </SubMenuList>
                </>
              ) : (
                <>
                  <SubMenuList>
                    <SubMenuBtn>
                      <Link>로그아웃</Link>
                    </SubMenuBtn>
                  </SubMenuList>
                  <SubMenuList>
                    <SubMenuBtn>
                      <Link to={ROUTE.PAGE_GROUP.link}>MYPAGE</Link>
                    </SubMenuBtn>
                  </SubMenuList>
                </>
              )}
            </SubMenu>
          )}
        </NavigationBox>
      </HeaderContainer>
    </HeaderWrap>
  );
}

const HeaderWrap = styled.div`
  width: 100%;
  height: 7.6rem;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 998;
`;


const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 20px;
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const LogoImgBox = styled.div`
  width: 100px;
  height: 40px;
  cursor: pointer;
  display:flex;
  align-items:center;
  img {
    width: 8rem;
    height: auto;
  }
`;

const LogoImgBox = styled.div``;

const NavigationBox = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const Navigation = styled.div`
  display: flex;
`;

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  height: 100%;
`;

const MenuList = styled.li`
  padding: 0 16px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: -0.5px;
  color: #252525;
  cursor: pointer;
  &:hover {
    color: #f1b24a;
  }
  a {
    font-size: 1.8rem;
    font-weight: 500;
    color: #111;
  }
`;

const InfoMenu = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 24px;
`;



const UserName = styled.div`
  margin-right: 8px;
  font-size: 16px;
  font-weight: bold;
  color: #252525;
`;

const CountBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #252525;
`;

const SubMenu = styled.div`
  display: flex;
  align-items: center;
  margin-left: 24px;
`;

const SubMenuList = styled.ul`
  display: flex;
  align-items: center;
  height: 100%;
  `
const LogoBox = styled.div`
  width: 8rem;
  margin-left: -3rem;
  img {
    width: 100%;
  }
  display: flex;
  flex-direction: row;
  gap: 5rem;
`;

const SubMenuBtn = styled.button`
  width: 120px;
  height: 48px;
  margin-left:2rem;
  border: ${({ btn }) => (btn === 'stroke' ? '1px solid #01881c' : 'none')};
  border-radius: 5px;
  background-color: ${({ btn }) => (btn === 'stroke' ? 'none' : '#01881c')};
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 1.6rem;
    font-weight: 600;
    color: ${({ btn }) => (btn === 'stroke' ? '#01881c' : '#fff')};
  }
`;

const MobileMenubox = styled.div`
  margin-left: 24px;
`;
