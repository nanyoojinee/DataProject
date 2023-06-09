import { Avatar, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MemberProfileBox from '../../components/commons/box/MemberProfileBox';
import GroupCalendar from '../../components/groups/details/Calendar';
import { useParams } from 'react-router-dom';
import * as API from '../../api/index';

export default function GroupDetailPage() {
  const [groupData, setGroupData] = useState([]);

  const groupId = useParams().id;

  useEffect(() => {
    const getGroupData = async () => {
      const result = await API.get(`/groups/${groupId}`);
      setGroupData(result.data);
    };
    getGroupData();
  }, []);

  console.log(groupData);

  const handleGroupJoin = async () => {
    try {
      // await API.post(`/groups/${groupId}/join`);
      alert('성공');
    } catch (err) {
      alert(err);
    }
  };

  return (
    <GroupDetailWrap>
      <GroupDetailContainer>
        <GroupTitle>3학년 1반 그룹</GroupTitle>
        <DetailContent01>
          <DetailInfoBox>
            <DetailThumbnail />
            <DetailInfo>
              <div>
                <UserProfile>
                  <Avatar
                    alt="내 프로필"
                    src="/images/commons/kkam.png"
                    sx={{ width: 40, height: 40 }}
                  />
                  <UserName>깜장이</UserName>
                </UserProfile>
                <UserBox>
                  <span>생성일</span>
                  <span>2023.01.01</span>
                </UserBox>
                <UserBox>
                  <span>모집인원</span>
                  <span>15명</span>
                </UserBox>
                <GroupDescription>내용이 들어갑니다... 내용이 들어갑니다......</GroupDescription>
              </div>
              <Button
                style={{ width: '180px', height: '40px', fontSize: '2.2rem' }}
                variant="contained"
                color="success"
                onClick={handleGroupJoin}
              >
                그룹신청
              </Button>
            </DetailInfo>
          </DetailInfoBox>
          <GroupMemberBox>
            <GroupMemberTitleBox>
              <GroupMemberTitle>그룹 명단</GroupMemberTitle>
              <MemberNumBox>
                <img src="/images/commons/user.png" alt="" />
                <MemberNum>14 / 15</MemberNum>
              </MemberNumBox>
            </GroupMemberTitleBox>
            <GroupMembers>
              <MemberProfileBox />
              <MemberProfileBox />
              <MemberProfileBox />
              <MemberProfileBox />
              <MemberProfileBox />
              <MemberProfileBox />
              <MemberProfileBox />
            </GroupMembers>
          </GroupMemberBox>
        </DetailContent01>
        <GroupCalendar />
      </GroupDetailContainer>
    </GroupDetailWrap>
  );
}

const GroupDetailWrap = styled.div`
  width: 100%;
  padding-top: 16rem;
`;

const GroupDetailContainer = styled.div`
  width: 1300px;
  margin: 0 auto;
`;

const GroupTitle = styled.h2`
  font-size: 3rem;
  font-weight: 500;
  color: #000;
  margin-bottom: 7.5rem;
`;

const DetailContent01 = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 8rem;
`;

const DetailInfoBox = styled.div`
  display: flex;
  gap: 4rem;
`;

const DetailThumbnail = styled.div`
  width: 30rem;
  height: 30rem;
  background-image: url('/images/main/main01.png');
  background-size: cover;
  border-radius: 0.8rem;
`;

const DetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 3rem;
`;

const UserName = styled.p`
  font-size: 2rem;
  font-weight: 400;
  color: #111;
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
  gap: 3.2rem;
  margin-bottom: 1rem;

  span {
    font-size: 1.5rem;
    font-weight: 400;
  }
  span:nth-child(1) {
    color: #132eba;
  }

  span:nth-child(2) {
    color: #111;
  }

  &:last-of-type {
    margin-bottom: 2.4rem;
  }
`;

const GroupMemberBox = styled.div``;

const GroupMemberTitleBox = styled.div`
  width: 35rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;
const GroupMemberTitle = styled.h4`
  font-size: 2rem;
  font-weight: 400;
  color: #111;
`;

const MemberNumBox = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const MemberNum = styled.span`
  font-size: 1.5rem;
  font-weight: 400;
  color: #111;
`;

const GroupMembers = styled.div`
  width: 100%;
  height: 26rem;
  background-color: #fff;
  border-radius: 0.8rem;
  padding: 1rem;
  overflow-y: auto;
  border: 1px solid #d9d9d9;
`;

const GroupDescription = styled.p`
  max-width: 40rem;
  font-size: 1.6rem;
  font-weight: 400;
  color: #999;
  line-height: 1.2;
`;
