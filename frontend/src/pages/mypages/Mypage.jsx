import React, { useState } from 'react';
import styled from 'styled-components';
import ManageModal from '../../components/mypages/groupbox/ManageModal';
import MyProfile from '../../components/mypages/profilebox/MyProfile';
import RewardPoints from '../../components/mypages/largebox/RewardPoints';
export default function Mypage() {

  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const openManageModal = () => {
    setIsManageModalOpen(true);
  };

  const [activeMenuItem, setActiveMenuItem] = useState('나의그룹');

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  return (
    <Container>
      <GroupMembers>
        <MyProfile />
      </GroupMembers>
      <Card>
        <Menu>
          <Menubox
            onClick={() => handleMenuItemClick('나의그룹')}
            active={activeMenuItem === '나의그룹'}
          >
            <MenuItem>나의그룹</MenuItem>
          </Menubox>
          <Menubox
            onClick={() => handleMenuItemClick('그룹관리')}
            active={activeMenuItem === '그룹관리'}
          >
            <MenuItem>그룹관리</MenuItem>
          </Menubox>
          <Menubox
            onClick={() => handleMenuItemClick('적립조회')}
            active={activeMenuItem === '적립조회'}
          >
            <MenuItem>적립조회</MenuItem>
          </Menubox>
          <Menubox
            onClick={() => handleMenuItemClick('내정보수정')}
            active={activeMenuItem === '내정보수정'}
          >
            <MenuItem>내정보수정</MenuItem>
          </Menubox>
        </Menu>
      </Card>
      <MenuContainer>
        {activeMenuItem === '나의그룹' && (
          <LargeBox>
          <GroupInfo>
            <GroupImage alt="그룹장 사진" src="/images/commons/kiki.JPG" />
            <GroupDetails>
              <GroupName>3학년 1반</GroupName>
              <GroupRole>
                  <GroupRoleText>그룹장</GroupRoleText>
                  <GroupRoleName>유진이</GroupRoleName>
              </GroupRole>
              <GroupMembersCount>
                <GroupMembersNum>인원</GroupMembersNum>
                <GroupMembersImgBox>
                  <GroupMembersImage src="/images/commons/kkam.png" alt="멤버 이미지" />
                  <GroupMembersImage src="/images/commons/kkam.png" alt="멤버 이미지" />
                  <GroupMembersImage src="/images/commons/kkam.png" alt="멤버 이미지" />
                  <GroupMembersImage src="/images/commons/kkam.png" alt="멤버 이미지" />
                </GroupMembersImgBox>
                <GroupMembersCountText>4/15</GroupMembersCountText>
              </GroupMembersCount>
              <GroupCreation>
                <GroupCreationText>생성일</GroupCreationText>
                <GroupCreationDate>2020.01.01</GroupCreationDate>
              </GroupCreation>
              <GroupButton>
                  <GroupLeaveButton>그룹탈퇴</GroupLeaveButton>
                  <GroupManageButton onClick={openManageModal}>그룹관리</GroupManageButton>
                  <GroupMoveButton>이동</GroupMoveButton>
              </GroupButton>
            </GroupDetails>
          </GroupInfo>
          </LargeBox>
        )}
        {activeMenuItem === '그룹관리' && (
          <GroupManagement>
          </GroupManagement>
        )}
        {activeMenuItem === '적립조회' && (
          <PointInquiry>
            <RewardPoints />
          </PointInquiry>
        )}
        {activeMenuItem === '내정보수정' && (
          <ProfileModification>
          </ProfileModification>
        )}
        {isManageModalOpen && (
          <ManageModal setIsManageModalOpen={setIsManageModalOpen} />
        )}
    </MenuContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 10rem;
`;

const GroupMembers = styled.div`
  margin-top: 13rem;
  margin-bottom: 4rem;
  width: 20%;
  height: 35rem;
  background-color: #fff;
  border-radius: 0.8rem;
  padding: 1rem;
  border: 1px solid #d9d9d9;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const MenuContainer = styled.div`
  width: 100rem;
  display:flex;
  justify-content: center;
  align-items: center;
`;
const Card = styled.div`
  width: 52rem;
  height: 6rem;
  background-color: #9fdf9f;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  margin-top: 3rem;
`;

const Menu = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 0.5rem;
  padding: 0;
`;

const Menubox = styled.button`
  width: 9rem;
  height: 4rem;
  padding: 0.3rem;
  margin: 1.5rem;
  transition: background-color 0.3s;
  &:hover {
    background-color: #fff;
    border-radius: 0.7rem;
  }
  ${({ active }) =>
  active &&
  `
  background-color: #fff;
  border-radius: 0.7rem;
  `}
`;

const MenuItem = styled.li`
  font-size: 1.6rem;
  font-weight: 500;
  color: #333;
`;

const LargeBox = styled.div`
  width: 90%;
  height: 30rem;
  background-color: #ffff;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  margin-top: 3rem;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

`;

const GroupInfo = styled.div`
  display: flex;
  align-items: center;
`;

const GroupImage = styled.img`
  width: 22rem;
  height: 22rem;
  margin-left: 3rem;
  margin-right: 3rem;
  margin-top: -1rem;
`;

const GroupDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-top:1.8rem;
  margin-bottom:2rem;

`;

const GroupName = styled.p`
  font-size: 3rem;
  font-weight: 500;
  color: #333;
  margin-top: -2rem;
  margin-bottom: 2rem;
`;

const GroupRole = styled.p`
  display: flex;
  flex-direction: row;
`;
const GroupRoleText = styled.p`
  font-size: 2rem;
  font-weight: 400;
  color: #777;
  margin-top: 1rem;
  margin-right: 4rem;
`;

const GroupRoleName = styled.p`
    font-size: 1.8rem;
    font-weight: 400;
    color: #777;
    margin-top: 1rem;
`;

const GroupMembersNum = styled.p`
  font-size: 2rem;
  font-weight: 400;
  color: #777;
  margin-top: 1rem;
  margin-right: 3rem;
`;
const GroupMembersCount = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;

const GroupMembersImgBox = styled.div`
  margin-left:2rem;
`;

const GroupMembersImage = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-right: -1rem;
  z-index: 1;
  margin-top: 1rem;
`;

const GroupMembersCountText = styled.p`
  margin-left: 2rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #777;
  margin-top: 1rem;

`;
const GroupCreation = styled.p`
  display:flex;
  flex-direction: row;
  align-items: center;
`;

const GroupCreationText = styled.p`
    font-size: 2rem;
    font-weight: 400;
    color: #777;
    margin-top: 2rem;
    margin-right: 4rem;
`;

const GroupCreationDate = styled.p`
  font-size: 1.5rem;
  font-weight: 400;
  color: #777;
  margin-top: 2rem;
`;

const GroupButton = styled.button``;

const GroupLeaveButton = styled.button`
    position: absolute;
    right: 20rem;
    bottom: 3rem;
    width: 8rem;
    height: 3rem;
    background-color: #949494;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 1.2rem;
    font-weight: 500;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const GroupManageButton = styled.button`
    position: absolute;
    right: 11.5rem;
    bottom: 3rem;
    width: 8rem;
    height: 3rem;
    background-color: #478a77;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 1.2rem;
    font-weight: 500;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const GroupMoveButton = styled.button`
    position: absolute;
    right: 3rem;
    bottom: 3rem;
    width: 8rem;
    height: 3rem;
    background-color: #478a77;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 1.2rem;
    font-weight: 500;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;
const GroupManagement = styled.div``;

const PointInquiry = styled.div`
    width:90%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ProfileModification = styled.div``;