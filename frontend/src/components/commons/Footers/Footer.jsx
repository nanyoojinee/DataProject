import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { res } from '../../../styles/responsive';

export default function Footer() {
  return (
    <FooterWrap>
      <FooterContainer>
        <FooterInfo>
          <InfoMent>COPYRIGHT 2023 TEAM06(HOT6)</InfoMent>
          <FooterMenu>
            <li>
              <Link>개인정보 처리방침</Link>
            </li>
            <span>|</span>
            <li>
              <Link>사이트맵</Link>
            </li>
            <span>|</span>
            <li>
              <Link>문의하기</Link>
            </li>
          </FooterMenu>
        </FooterInfo>
        <FooterLogoBox>
          <img src="/images/commons/textlogo.png" alt="" />
        </FooterLogoBox>
      </FooterContainer>
    </FooterWrap>
  );
}

const FooterWrap = styled.footer`
  width: 100%;
  background-color: #f1f5f0;
  padding: 3rem 0;
`;
const FooterContainer = styled.div`
  width: 1300px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${res.tablet} {
    width: 90%;
  }
`;

const FooterInfo = styled.div``;

const InfoMent = styled.p`
  font-size: 1.5rem;
  color: #111;
  margin-bottom: 2rem;
`;

const FooterLogoBox = styled.div`
  width: 10rem;
  img {
    width: 100%;
  }
`;

const FooterMenu = styled.ul`
  display: flex;
  gap: 1rem;

  li {
    a {
      font-size: 1.4rem;
      font-weight: 400;
      color: #111;
    }

    a:hover {
      font-weight: 500;
      text-decoration: underline;
    }
  }
`;
