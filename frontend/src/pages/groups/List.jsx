import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RankProfile from '../../components/groups/lists/RankProfile';
import Search from '../../components/groups/lists/Search';
import { Button, Pagination } from '@mui/material';
import ListBox from '../../components/commons/box/ListBox';
import SubTitle from '../../components/commons/title/SubTitle';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../constants/routes/routeData';
import * as Api from '../../api/index';

export default function GroupList() {
  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
    const getGroups = async () => {
      const result = await Api.get('/groups');
      setGroupList(result.data.result);
    };
    getGroups();
  }, []);

  return (
    <GroupListWrap>
      <RankingBox>
        <RankTitle>그룹 TOP 3</RankTitle>
        <RankProfileContainer>
          <RankProfile />
          <RankProfile />
          <RankProfile />
        </RankProfileContainer>
      </RankingBox>
      <GroupListContainer>
        <SubTitle title="GROUP" />
        <SearchContainer>
          <Search variant="contained" />
          <Button variant="contained">
            <Link to={ROUTE.GROUP_WRITE.link}>그룹등록</Link>
          </Button>
        </SearchContainer>
        <GroupLists>
          {groupList?.map(group => (
            <ListBox key={group.id} group={group} />
          ))}
        </GroupLists>
        <PagenationBox>
          <Pagination count={5} size="large" />
        </PagenationBox>
      </GroupListContainer>
    </GroupListWrap>
  );
}

const GroupListWrap = styled.div`
  width: 100%;
  padding-top: 96px;
`;

const RankingBox = styled.div`
  width: 100%;
  padding: 6.5rem 0;
  background-color: #111;
`;

const RankTitle = styled.h2`
  font-size: 36px;
  font-weight: 500;
  color: #fff;
  text-align: center;
  margin-bottom: 2.5rem;
`;

const RankProfileContainer = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
`;

const GroupListContainer = styled.div`
  width: 1300px;
  margin: 0 auto;
  padding-top: 10rem;
`;

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  margin-bottom: 4.5rem;
  button {
    font-size: 1.5rem;
    padding: 0;
    a {
      width: 100%;
      height: 100%;
      font-size: 1.5rem;
      display: block;
      padding: 6px 16px;
    }
  }
`;

const GroupLists = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 3rem 2%;
  margin-bottom: 5rem;
`;

const PagenationBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    font-size: 1.6rem;
  }
  svg {
    width: 3rem;
  }
`;
