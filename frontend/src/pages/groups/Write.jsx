import React, { useState } from 'react';
import styled from 'styled-components';
import FileUpload from '../../components/commons/FileUpload';
import { Button, Slider, TextField } from '@mui/material';
import * as API from '../../api/index';
import { imgFileState, isErrorModalState, isSuccessModalState, updateState } from '../../stores';
import { useRecoilState } from 'recoil';
import { Link, useNavigate } from 'react-router-dom';

const marks = [
  {
    value: 0,
    label: '0명',
  },
  {
    value: 100,
    label: '100명',
  },
];

export default function GroupWritePage() {
  const [sliderValue, setSliderValue] = useState(0);
  const [groupTitle, setGroupTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [thumbnail] = useRecoilState(imgFileState);
  const [, setIsScucessModal] = useRecoilState(isSuccessModalState);
  const [, setIsErrorModal] = useRecoilState(isErrorModalState);
  const [, setUpdate] = useRecoilState(updateState);

  const navigete = useNavigate();

  const onChangeSliderValue = value => {
    setSliderValue(value);
  };

  const onChangeInput = e => {
    const { name, value } = e.target;

    if (name === 'groupTitle') {
      if (value === '') {
        setTitleError(true);
      } else {
        setTitleError(false);
      }
      setGroupTitle(value);
    }
    if (name === 'description') {
      if (value === '') {
        setDescriptionError(true);
      } else {
        setDescriptionError(false);
      }
      setDescription(value);
    }
  };

  const onClickAddGroup = async () => {
    try {
      const formData = new FormData();

      formData.append('title', groupTitle);
      formData.append('description', description);
      formData.append('totalNumOfMembers', sliderValue);
      formData.append('thumbnail', thumbnail);

      const result = await API.formPost('/groups', formData);
      setIsScucessModal({
        state: true,
        message: '그룹을 등록하였습니다.',
      });

      setUpdate(prev => prev + 1);
      navigete(`/groups/${result.data.newGroup._id}`);
    } catch (err) {
      setIsErrorModal({
        state: true,
        message: err.response.data.message,
      });
    }
  };

  return (
    <WriteWrap>
      <WriteContainer>
        <Title>그룹 등록</Title>
        <Form>
          <FileContainer>
            <FileUpload />
          </FileContainer>
          <InputBox>
            <TextField
              id="outlined-basic"
              label="그룹 명"
              variant="outlined"
              name="groupTitle"
              onChange={onChangeInput}
              error={titleError}
              helperText={titleError && '그룹명을 입력해주세요.'}
            />
          </InputBox>
          <SliderBox>
            <Slider
              aria-label="Custom marks"
              defaultValue={0}
              step={1}
              valueLabelDisplay="auto"
              marks={marks}
              getAriaValueText={onChangeSliderValue}
            />
            <p>{sliderValue}명</p>
          </SliderBox>
          <InputBox>
            <TextField
              id="outlined-textarea"
              label="그룹 상세내용"
              placeholder="상세내용을 입력해주세요."
              name="description"
              onChange={onChangeInput}
              multiline
              error={descriptionError}
              helperText={descriptionError && '상세내용을 입력해주세요.'}
            />
          </InputBox>
          <BtnBox>
            <Button
              variant="contained"
              color="success"
              disabled={
                titleError === true ||
                groupTitle === '' ||
                descriptionError === true ||
                description === '' ||
                sliderValue === 0
              }
              onClick={onClickAddGroup}
            >
              등록
            </Button>
            <Button variant="outlined" color="success">
              <Link to={'/groups'}>취소</Link>
            </Button>
          </BtnBox>
        </Form>
      </WriteContainer>
    </WriteWrap>
  );
}

const WriteWrap = styled.div`
  width: 100%;
  padding: 9.6rem;
`;

const WriteContainer = styled.div`
  width: 500px;
  margin: 0 auto;
  padding: 3rem;
  background-color: #fff;
  border-radius: 1rem;
`;

const Form = styled.form`
  width: 100%;
  .css-1u3bzj6-MuiFormControl-root-MuiTextField-root {
    width: 100%;
    label {
      font-size: 1.4rem;
    }
    .css-dpjnhs-MuiInputBase-root-MuiOutlinedInput-root {
      width: 100%;
      min-height: 6rem;
      textarea {
        font-size: 1.4rem;
        line-height: 1.3;
        overflow-y: auto;
      }
    }
    .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
      font-size: 1.4rem;
    }
  }

  .css-1aznpnh-MuiSlider-root {
    width: 80%;
    margin-left: 10px;
  }

  p {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1b5e20;
  }
`;

const Title = styled.h2`
  font-size: 3.2rem;
  font-weight: 500;
  color: #1b5e20;
  text-align: center;
  margin-bottom: 3rem;
`;

const FileContainer = styled.div`
  width: 35rem;
  margin: 0 auto 3rem;
`;

const InputBox = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`;

const SliderBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const BtnBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  margin-top: 3rem;
  button {
    font-size: 1.7rem;
    padding: 1rem 5rem;
    a {
      font-size: 1.7rem;
    }
  }
`;
