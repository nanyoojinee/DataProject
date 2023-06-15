import is from '@sindresorhus/is';
import { Router } from 'express';
import { loginRequired } from '../middlewares/loginRequired.js';
import { userAuthService } from '../services/userService.js';
import { upload } from '../middlewares/imageUploadMiddleware.js';

const userAuthRouter = Router();
const imgUpload = upload.single('profileImg');

// 회원가입
userAuthRouter.post('/users', imgUpload, async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error('headers의 Content-Type을 "multipart/form-data"로 설정해주세요');
    }

    // req (request) 에서 데이터 가져오기
    const { userId, password, name, nickname, phone, address, addressDetail } = req.body;
    const profileImg = req.file ? req.file.filename : undefined;

    const newUser = await userAuthService.addUser({
      userId,
      password,
      name,
      nickname,
      phone,
      address,
      addressDetail,
      profileImg,
    });

    if (newUser.errorMessage) {
      throw new Error(newUser.errorMessage);
    }

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

//로그인
userAuthRouter.post('/login', async (req, res, next) => {
  try {
    // req (request) 에서 데이터 가져오기
    const { userId, password } = req.body;

    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    const user = await userAuthService.getUser({ userId, password });

    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});
// 유저 목록
userAuthRouter.get('/users', loginRequired, async (req, res, next) => {
  try {
    const users = await userAuthService.getUsers();
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
});

// 정보 수정
userAuthRouter.put('/users/:id', imgUpload, loginRequired, async (req, res, next) => {
  try {
    const loginedId = req.params.id;
    const password = req.body.password ?? null;
    const nickname = req.body.nickname ?? null;
    const phone = req.body.phone ?? null;
    const address = req.body.address ?? null;
    const addressDetail = req.body.addressDetail ?? null;
    const profileImg = req.file ? req.file.filename : '';

    const toUpdate = {
      password,
      nickname,
      phone,
      address,
      addressDetail,
      profileImg,
    };

    // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
    const updatedUser = await userAuthService.setUser({ loginedId, toUpdate });

    if (updatedUser.errorMessage) {
      throw new Error(updatedUser.errorMessage);
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});
// 유저 정보 조회
userAuthRouter.get('/user', loginRequired, async (req, res, next) => {
  try {
    const loginedId = req.currentUserId;
    const currentUserInfo = await userAuthService.getUserInfo({ loginedId });

    if (currentUserInfo.errorMessage) {
      throw new Error(currentUserInfo.errorMessage);
    }

    res.status(200).send(currentUserInfo);
  } catch (error) {
    next(error);
  }
});

export { userAuthRouter };
