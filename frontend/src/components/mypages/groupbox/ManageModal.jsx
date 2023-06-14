import React, { useState } from 'react';
import styled from 'styled-components';
import { Avatar } from '@mui/material';
import * as API from '../../../api';
export default function ManageModal({ setIsManageModalOpen, waitingMembers }) {
  const handleApproveMember = (userId, groupId) => {
    console.log(groupId, userId);
    API.put(`/mygroups/${groupId}/${userId}/approval`)
      .then(_response => {
        console.log('멤버가 성공적으로 승인되었습니다.');
      })
      .catch(error => {
        console.log('멤버 승인에 실패했습니다.', error);
      });
  };
  // /mygroups/648976bd979b21553804f272/6489781f979b21553804f29f/approval
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(true);

  const closeManageModal = () => {
    setIsManageModalOpen(false);
  };

  const openJoinModal = () => {
    setIsJoinModalOpen(true);
  };

  const openActModal = () => {
    setIsJoinModalOpen(false);
  };

  return (
    <Modal>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>그룹 관리</ModalTitle>
          <ModalCloseButton onClick={closeManageModal}>X</ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <ButtonContainer>
            <JoinButton onClick={openJoinModal} active={isJoinModalOpen}>
              가입신청
            </JoinButton>
            <ActButton onClick={openActModal} active={!isJoinModalOpen}>
              활동체크
            </ActButton>
          </ButtonContainer>
          {isJoinModalOpen ? (
            <MembersInfo>
              {waitingMembers.length > 0 ? (
                waitingMembers?.map(el => (
                  <MemberItem key={el._id}>
                    <MemberNameBox>
                      <Avatar
                        alt="멤버 이미지"
                        src={`http://localhost:5001/uploads/${el.userId.profileImg}`}
                      />
                      <MemberText>
                        {el.userId.name}({el.userId.nickname})
                      </MemberText>
                    </MemberNameBox>
                    <ManageButton>
                      <AcceptButton onClick={() => handleApproveMember(el.userId._id, el.groupId)}>수락</AcceptButton>
                      <RejectButton>거절</RejectButton>
                    </ManageButton>
                  </MemberItem>
                ))
              ) : (
                <ErrorText>가입 신청 내역이 없습니다.</ErrorText>
              )}
            </MembersInfo>
          ) : (
            <MembersInfo>
              <MemberItem>
                <MemberNameBox>
                  <Avatar alt="멤버 이미지" src="/images/commons/kkam.png" />
                  <MemberText>깜장이</MemberText>
                  <TumblerText>📷 텀블러</TumblerText>
                </MemberNameBox>
                <ManageButton>
                  <AcceptButton>수락</AcceptButton>
                  <RejectButton>거절</RejectButton>
                </ManageButton>
              </MemberItem>
              <MemberItem>
                <MemberNameBox>
                  <Avatar alt="멤버 이미지" src="/images/commons/kkam.png" />
                  <MemberText>깜장이</MemberText>
                  <ContainerText>📷 다회용기</ContainerText>
                </MemberNameBox>
                <ManageButton>
                  <AcceptButton>수락</AcceptButton>
                  <RejectButton>거절</RejectButton>
                </ManageButton>
              </MemberItem>
              <MemberItem>
                <MemberNameBox>
                  <Avatar alt="멤버 이미지" src="/images/commons/kkam.png" />
                  <MemberText>깜장이</MemberText>
                  <TumblerText>📷 텀블러</TumblerText>
                </MemberNameBox>
                <ManageButton>
                  <AcceptButton>수락</AcceptButton>
                  <RejectButton>거절</RejectButton>
                </ManageButton>
              </MemberItem>
              <MemberItem>
                <MemberNameBox>
                  <Avatar alt="멤버 이미지" src="/images/commons/kkam.png" />
                  <MemberText>깜장이</MemberText>
                  <ContainerText>📷 다회용기</ContainerText>
                </MemberNameBox>
                <ManageButton>
                  <AcceptButton>수락</AcceptButton>
                  <RejectButton>거절</RejectButton>
                </ManageButton>
              </MemberItem>
            </MembersInfo>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ModalContent = styled.div`
  width: 35%;
  background-color: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
`;

const ModalCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: #777777;
  cursor: pointer;
  position: absolute;
  right: 3rem;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  width: 25rem;
  height: 4rem;
  background-color: #9fdf9f;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  margin-top: 3rem;
`;

const JoinButton = styled.button`
  width: 9rem;
  height: 3rem;
  padding: 0.3rem;
  margin: 1.5rem;
  transition: background-color 0.3s;
  background-color: ${props => (props.active ? '#fff' : '#9fdf9f')};
  border-radius: 0.7rem;
`;

const ActButton = styled.button`
  width: 9rem;
  height: 3rem;
  padding: 0.3rem;
  margin: 1.5rem;
  transition: background-color 0.3s;
  background-color: ${props => (props.active ? '#fff' : '#9fdf9f')};
  border-radius: 0.7rem;
`;

const ManageButton = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AcceptButton = styled.button`
  margin-right: 1rem;
  margin-left: 1rem;
  width: 4.5rem;
  height: 2.5rem;
  background-color: #478a77;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;
const RejectButton = styled.button`
  width: 4.5rem;
  height: 2.5rem;
  background-color: #bab6b6;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const MembersInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

const MemberItem = styled.div`
  width: 43rem;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border: 1px solid #d3d3d3;
  border-radius: 8px;
  padding: 1.2rem;
  justify-content: space-between;
`;

const MemberText = styled.span`
  font-size: 16px;
  margin-left: 10px;
`;

const MemberNameBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TumblerText = styled.button`
  font-size: 10px;
  margin-left: 10px;
  color: #999999;
`;

const ContainerText = styled.button`
  font-size: 10px;
  margin-left: 10px;
  color: #999999;
`;

const ErrorText = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  color: #111;
  text-align: center;
  margin: 3rem 0;
`;
