import React from 'react';
import styled from 'styled-components';
import { Avatar } from '@mui/material';

export default function MyProfile({ userInfo }) {
  return (
    <ProfileBox>
      <Avatar
        alt="내 프로필"
        src={`http://localhost:5001/uploads/${userInfo?.user?.profileImg}`}
        sx={{ width: 60, height: 60 }}
      />
      <UserName>{userInfo?.user?.name}</UserName>
      <Email>{userInfo?.user?.nickname}</Email>
      <InfoRow>
        <InfoItem>
          <InfoLabel>Phone</InfoLabel>
          <InfoValue>{userInfo?.user?.phone}</InfoValue>
        </InfoItem>
      </InfoRow>
      <Separator />
      <Credit>
        <CreditNum>⭐️ 13</CreditNum>
      </Credit>
      <EmojiRow>
        <EmojiItem>
          <Emoji>🥤</Emoji>
          <EmojiCount>3</EmojiCount>
        </EmojiItem>
        <EmojiItem>
          <Emoji>♻️</Emoji>
          <EmojiCount>10</EmojiCount>
        </EmojiItem>
      </EmojiRow>
    </ProfileBox>
  );
}

const ProfileBox = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1px;
`;
const UserName = styled.p`
  font-size: 2.3rem;
  font-weight: 400;
  color: #777;
  margin-top: 2rem;
`;

const Email = styled.p`
  font-size: 1.3rem;
  font-weight: 400;
  color: #777;
  margin-top: 1.3rem;
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2.5rem;
  margin-bottom: 2rem;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 1.5rem;
`;

const InfoLabel = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
  color: #777;
`;

const InfoValue = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  color: #777;
  margin-left: 0.7rem;
`;

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: #d9d9d9;
  margin: 1.5rem 0;
`;

const EmojiRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1.5rem;
`;

const EmojiItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1.5rem;
`;

const Emoji = styled.span`
  font-size: 1.8rem;
`;

const EmojiCount = styled.span`
  font-size: 1.8rem;
  margin-left: 0.2rem;
  color: #777777;
`;

const Credit = styled.div`
  margin-right: 2rem;
  margin-bottom: 1rem;
`;
const CreditNum = styled.p`
  font-size: 2.5rem;
  color: #e7c448;
  font-weight: bold;
`;
