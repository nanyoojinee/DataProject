import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FileUpload from '../../components/commons/FileUpload';
import { Button, TextField } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import Postcode from '../../components/commons/DaumPostCode';
import { useRecoilState } from 'recoil';
import {
  imgFileState,
  isPostcodeModalState,
  postcodeAddressState,
  updateState,
  userInfoState,
} from '../../stores';
import axios from 'axios';
import { ROUTE } from '../../constants/routes/routeData';

export default function JoinPage({ page }) {
  const [isPostcodeModal, setIsPostcodeModal] = useRecoilState(isPostcodeModalState);
  const [postcodeAddress, setPostcodeAddress] = useRecoilState(postcodeAddressState);
  const [imgFile] = useRecoilState(imgFileState);
  const [userInfo] = useRecoilState(userInfoState);
  const [, setUpdate] = useRecoilState(updateState);

  const navigate = useNavigate();

  const [formDatas, setFormData] = useState({
    userId: userInfo?.user?.userId || '',
    password: '',
    passwordConfirm: '',
    name: userInfo?.user?.name || '',
    nickname: userInfo?.user?.nickname || '',
    phone: userInfo?.user?.phone || '',
    addressDetail: userInfo?.user?.addressDetail || '',
  });

  const [formError, setFormError] = useState({
    userId: false,
    password: false,
    passwordConfirm: false,
    name: false,
    nickname: false,
    phone: false,
  });

  const disabled =
    formDatas.userId === '' ||
    formDatas.password === '' ||
    formDatas.passwordConfirm === '' ||
    formDatas.name === '' ||
    formDatas.nickname === '' ||
    formDatas.phone === '' ||
    formError.userId === true ||
    formError.password === true ||
    formError.passwordConfirm === true ||
    formError.name === true ||
    formError.nickname === true ||
    formError.phone === true;

  useEffect(() => {
    return () => {
      setPostcodeAddress(''); // Modified line
    };
  }, [setPostcodeAddress]); // Modified line

  const handleInputChange = e => {
    const { name, value } = e.target;

    if (value === '') {
      setFormError(prev => ({ ...prev, [name]: true }));
    } else {
      setFormError(prev => ({ ...prev, [name]: false }));
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$&*])[a-zA-Z\d!@#$%^&*]{8,}$/;

    if (name === 'password') {
      console.log(passwordRegex.test(value));
      if (!passwordRegex.test(value)) {
        setFormError(prev => ({ ...prev, password: true }));
      } else {
        setFormError(prev => ({ ...prev, password: false }));
      }

      if (formDatas.passwordConfirm !== value) {
        setFormError(prev => ({ ...prev, passwordConfirm: true }));
      } else {
        setFormError(prev => ({ ...prev, passwordConfirm: false }));
      }
    }

    if (name === 'passwordConfirm') {
      if (formDatas.password !== value) {
        setFormError(prev => ({ ...prev, passwordConfirm: true }));
      } else {
        setFormError(prev => ({ ...prev, passwordConfirm: false }));
      }
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onClicktoggleAddressModal = () => {
    setIsPostcodeModal(prev => !prev);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('userId', formDatas.userId);
    formData.append('password', formDatas.password);
    formData.append('name', formDatas.name);
    formData.append('nickname', formDatas.nickname);
    formData.append('phone', formDatas.phone);
    formData.append('address', postcodeAddress);
    formData.append('addressDetail', formDatas.addressDetail);
    formData.append('profileImg', imgFile);

    try {
      if (page === 'join') {
        const response = await axios.post('http://localhost:5001/users', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        navigate('/');

        if (!response.ok) {
          throw new Error('User registration failed.');
        }
      } else {
        const response = await axios.put(
          `http://localhost:5001/users/${userInfo?.user?._id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
            },
          },
        );

        setUpdate(prev => prev + 1);
        navigate(ROUTE.PAGE_GROUP.link);

        if (!response.ok) {
          throw new Error('정보 수정 실패');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <JoinWrap>
      <JoinContainer>
        <TitleBox>
          <JoinImgBox>
            <img src="/images/commons/mainearth.png" alt="사랑해 지구야 로고" />
          </JoinImgBox>
          <JoinTitle>{page === 'join' ? '회원가입' : '내 정보 수정'}</JoinTitle>
        </TitleBox>
        <Form onSubmit={handleSubmit}>
          <ProfileImgBox>
            <FileUpload img={userInfo?.user?.profile} />
          </ProfileImgBox>
          <InputBox>
            <TextField
              label="아이디"
              id="outlined-start-adornment"
              name="userId"
              value={formDatas.userId}
              onChange={handleInputChange}
              error={formError.userId === true}
              helperText={formError.userId === true && '아이디를 입력해주세요.'}
              disabled={page === 'changeInfo'}
            />
          </InputBox>
          <InputBox>
            <TextField
              label="비밀번호"
              id="outlined-start-adornment"
              name="password"
              type="password"
              value={formDatas.password}
              onChange={handleInputChange}
              error={formError.password === true || formError.passwordConfirm === true}
              helperText={
                formError.password === true &&
                '비밀번호는 영문 숫자 특수문자를 포함한 8자리 이상 입력해주세요.'
              }
            />
          </InputBox>
          <InputBox>
            <TextField
              label="비밀번호 확인"
              id="outlined-start-adornment"
              name="passwordConfirm"
              type="password"
              value={formDatas.passwordConfirm}
              onChange={handleInputChange}
              error={formError.passwordConfirm === true}
              helperText={formError.passwordConfirm === true && '비밀번호가 서로 다릅니다.'}
            />
          </InputBox>
          <InputBox>
            <TextField
              label="이름"
              id="outlined-start-adornment"
              name="name"
              value={formDatas.name}
              onChange={handleInputChange}
              error={formError.name === true}
              helperText={formError.name === true && '이름을 입력해주세요.'}
              disabled={page === 'changeInfo'}
            />
          </InputBox>
          <InputBox>
            <TextField
              label="닉네임"
              id="outlined-start-adornment"
              name="nickname"
              value={formDatas.nickname}
              onChange={handleInputChange}
              error={formError.nickname === true}
              helperText={formError.nickname === true && '닉네임을 입력해주세요.'}
            />
          </InputBox>
          <InputBox>
            <TextField
              label="핸드폰 번호"
              id="outlined-start-adornment"
              placeholder="Ex) 010-0000-0000"
              name="phone"
              value={formDatas.phone}
              onChange={handleInputChange}
              error={formError.phone === true}
              helperText={formError.phone === true && '핸드폰 번호를 입력해주세요.'}
            />
          </InputBox>
          <InputBox>
            <TextField
              label={postcodeAddress ? '' : '주소'}
              id="outlined-start-adornment"
              disabled
              value={userInfo?.user?.address || postcodeAddress}
            />
            <SearchIconBox onClick={onClicktoggleAddressModal}>
              <SearchIcon />
            </SearchIconBox>
          </InputBox>
          <InputBox>
            <TextField
              label="상세주소"
              id="outlined-start-adornment"
              name="addressDetail"
              value={formDatas.addressDetail}
              onChange={handleInputChange}
            />
          </InputBox>
          <Button type="submit" variant="contained" color="success" disabled={disabled}>
            {page === 'join' ? '회원가입' : '수정하기'}
          </Button>
          {page === 'join' && (
            <LoginLink>
              <Link to="/login">이미 가입하셨다면? 로그인 하러가기</Link>
            </LoginLink>
          )}
        </Form>
      </JoinContainer>
      {isPostcodeModal && <Postcode />}
    </JoinWrap>
  );
}

const JoinWrap = styled.div`
  width: 100%;
  padding-top: 12rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15rem;
`;

const JoinContainer = styled.div`
  width: 500px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 1rem;
  padding: 3rem;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding-right: 5rem;
`;

const JoinTitle = styled.h3`
  font-size: 4rem;
  font-weight: 600;
  color: #01881c;
`;

const JoinImgBox = styled.div`
  width: 6rem;
  margin-right: 1rem;
  img {
    width: 120%;
  }
`;

const Form = styled.form`
  width: 100%;

  .css-1u3bzj6-MuiFormControl-root-MuiTextField-root {
    width: 100%;
  }
  .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
    width: 100%;
  }
  .css-r47a1p-MuiFormControl-root {
    width: 100%;
    margin: 0;
  }

  .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root,
  .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input,
  .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input {
    font-size: 1.5rem;
  }

  button {
    width: 100%;
    padding: 1.3rem 0;
    font-size: 1.6rem;
    font-weight: 500;
    color: #fff;
    margin-bottom: 2.5rem;
  }
`;

const ProfileImgBox = styled.div`
  width: 16rem;
  height: 16rem;
  margin: 3rem auto;
  label {
    height: 100%;
    border-radius: 50%;
  }
`;

const InputBox = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

const SearchIconBox = styled.div`
  width: 2rem;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 2rem;
  cursor: pointer;

  .css-i4bv87-MuiSvgIcon-root {
    font-size: 2.5rem;
  }
`;

const LoginLink = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    font-size: 1.3rem;
    font-weight: 400;
    color: #1759ff;
    &:hover {
      text-decoration: underline;
    }
  }
`;
