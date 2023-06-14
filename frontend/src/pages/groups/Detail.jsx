import { Avatar, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MemberProfileBox from '../../components/commons/box/MemberProfileBox';
import GroupCalendar from '../../components/groups/details/Calendar';
import { useParams } from 'react-router-dom';
import * as API from '../../api/index';
import { res } from '../../styles/responsive';
import { useRecoilState } from 'recoil';
import { isErrorModalState, isSuccessModalState } from '../../stores';

export default function GroupDetailPage() {
  const [groupData, setGroupData] = useState([]);
  const [, setIsScucessModal] = useRecoilState(isSuccessModalState);
  const [, setIsErrorModal] = useRecoilState(isErrorModalState);

  const groupId = useParams().id;

  useEffect(() => {
    const getGroupData = async () => {
      const result = await API.get(`/groups/${groupId}`);
      setGroupData(result.data.myGroup);
    };
    getGroupData();
  }, []);

  const handleGroupJoin = async () => {
    try {
      await API.post(`/mygroups/${groupId}`);
      setIsScucessModal({
        state: true,
        message: '그룹신청에 성공하였습니다. 그룹장 수락 후 그룹 활동이 활성화 됩니다.',
      });
    } catch (err) {
      setIsErrorModal({ state: true, message: err.response.data.message });
    }
  };

  const tumblerUsage = 81;
  const tumblerTotal = 1000;
  const tumblerWidth = (tumblerUsage / tumblerTotal) * 100;

  const containerUsage = 210;
  const containerTotal = 1000;
  const containerWidth = (containerUsage / containerTotal) * 100;

  const totalUsage = tumblerUsage + containerUsage;

  return (
    <GroupDetailWrap>
      <GroupDetailContainer>
        <GroupTitle>{groupData.title}</GroupTitle>
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
                  <span>{groupData.totalNumOfMembers}명</span>
                </UserBox>
                <GroupDescription>{groupData.description}</GroupDescription>
              </div>
              <div>
                <Button
                  style={{ width: '180px', height: '40px', fontSize: '2.2rem' }}
                  variant="contained"
                  color="success"
                  onClick={handleGroupJoin}
                >
                  그룹신청
                </Button>
              </div>
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
      <AdditionalBox>
        <ProgressContainer>
          <ProgressTitle>
            <IconContainer>🥤텀블러</IconContainer>
            <ProgressBar>
              <FilledProgressBar width={tumblerWidth} />
            </ProgressBar>
            <ProgressValue>{tumblerUsage}</ProgressValue>
          </ProgressTitle>
          <ProgressTitle>
            <IconContainer>🫙다회용기</IconContainer>
            <ProgressBar>
              <FilledProgressBar width={containerWidth} />
            </ProgressBar>
            <ProgressValue>{containerUsage}</ProgressValue>
          </ProgressTitle>
        </ProgressContainer>
        <EarthBox>
          <LogoImage>
            <img src="/images/commons/coinearth.png" alt="사랑해 지구야 로고" />
          </LogoImage>
          <StatusMessage>
            <SpeechBubble>
              <SpeechText>Good!</SpeechText>
              <Desc>3학년 1반 그룹의 총 텀블러 사용 횟수는 {tumblerUsage}회,</Desc>
              <Desc>다회용기 사용 횟수는 {containerUsage}회야!</Desc>
              <SpeechHighlight>우리는 ⭐️{totalUsage}회⭐️ 지구를 지켰어!</SpeechHighlight>
            </SpeechBubble>
          </StatusMessage>
        </EarthBox>
      </AdditionalBox>
    </GroupDetailWrap>
  );
}
const GroupDetailWrap = styled.div`
  width: 100%;
  padding-top: 16rem;
  margin-bottom: 15rem;
`;

const GroupDetailContainer = styled.div`
  width: 1300px;
  margin: 0 auto;

  @media ${res.tablet} {
    width: 90%;
  }
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

  @media (max-width: 1080px) {
    width: 100%;
    justify-content: center;
  }
`;

const DetailThumbnail = styled.div`
  width: 30rem;
  height: 30rem;
  background-image: url('/images/main/main01.png');
  background-size: cover;
  border-radius: 0.8rem;

  @media (max-width: 1080px) {
    width: 40rem;
    justify-content: center;
  }
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

const GroupMemberBox = styled.div`
  @media (max-width: 1080px) {
    display: none;
  }
`;

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

const AdditionalBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
  margin-bottom: 4rem;
  margin-top: 20rem;
  justify-content: center;
  justify-content: space-around;
  @media (max-width: 1080px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
  flex-direction: column;
`;

const ProgressTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const IconContainer = styled.div`
  margin-top: 3rem;
  width: 10rem;
  height: 5rem;
  font-size: 2rem;
`;

const ProgressBar = styled.div`
  width: 25rem;
  height: 1.2rem;
  background-color: #e0e0e0;
  border-radius: 0.6rem;
`;

const FilledProgressBar = styled.div`
  width: ${props => props.width}%;
  height: 100%;
  background-color: #7ed321;
  border-radius: 0.6rem;
`;

const ProgressValue = styled.span`
  font-size: 2.2rem;
  font-weight: 500;
  color: #111;
`;
const EarthBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
const StatusMessage = styled.div`
  display: flex;
  align-items: center;
  font-size: 3rem;
  font-weight: 400;
  color: #111;
  line-height: 1.5;
  margin-top: -3rem;
`;

const SpeechBubble = styled.div`
  position: relative;
  background-color: #ffffff;
  border-radius: 2rem;
  padding: 3rem;
  margin-left: 7rem;

  &::before {
    content: '';
    position: absolute;
    top: 1.4rem;
    left: -2rem;
    border: 1.8rem solid transparent;
    border-bottom-color: #ffffff;
    border-right-color: #ffffff;
    transform: rotate(-120deg);
  }
`;
const SpeechText = styled.p`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #98af47;
  font-family: 'Comic Sans MS', cursive;
`;

const Desc = styled.p`
  font-size: 1.7rem;
  font-family: 'Comic Sans MS', cursive;
`;

const SpeechHighlight = styled.h1`
  font-size: 2.2rem;
  font-weight: 500;
  margin-top: 1rem;
  font-family: 'Comic Sans MS', cursive;
`;

const LogoImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    margin-top: -1rem;
    width: 30rem;
  }
`;