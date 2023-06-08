import React from 'react';
import styled from 'styled-components';
import { Pagination } from '@mui/material';

const RewardPoints = () => {
  return (
    <LargeBox>
        <SmallBox>
          <TumblerContent>
            <div>2023.06.08 텀블러 사용</div>
            <div>🥤+1</div>
          </TumblerContent>
        </SmallBox>
        <SmallBox>
            <ContainerContent>
                <div>2023.06.08 다회용기 사용</div>
                <div>♻️+1</div>
            </ContainerContent>
        </SmallBox>
        <SmallBox>
          <TumblerContent>
            <div>2023.06.08 텀블러 사용</div>
            <div>🥤+1</div>
          </TumblerContent>
        </SmallBox>
        <SmallBox>
            <ContainerContent>
                <div>2023.06.08 다회용기 사용</div>
                <div>♻️+1</div>
            </ContainerContent>
        </SmallBox>
        <SmallBox>
          <TumblerContent>
            <div>2023.06.08 텀블러 사용</div>
            <div>🥤+1</div>
          </TumblerContent>
        </SmallBox>
        <SmallBox>
            <ContainerContent>
                <div>2023.06.08 다회용기 사용</div>
                <div>♻️+1</div>
            </ContainerContent>
        </SmallBox>
      <PaginationContainer>
        <Pagination count={5} size="large" />
      </PaginationContainer>
    </LargeBox>
  );
};

const LargeBox = styled.div`
  width: 90%;
  background-color: #ffff;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  margin-top: 3rem;
  padding-bottom: 3rem;
  padding-top: 3rem;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  flex-direction: column;
`;

const SmallBox = styled.div`
  width: 50%;
  height: 100%;
  background-color: #f9f9f9;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  margin: 0.7rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const TumblerContent = styled.div`
    width:100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ContainerContent = styled.div`
  width:100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

export default RewardPoints;
