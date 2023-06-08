import is from '@sindresorhus/is';
import { Router } from 'express';
import { loginRequired } from '../middlewares/loginRequired.js';
import { userAuthService } from '../services/userService.js';
import { upload } from '../middlewares/imageUploadMiddleware.js';

const userAuthRouter = Router();
const imgUpload = upload.single('profileImg');

userAuthRouter.post('/users', imgUpload, async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error('headers의 Content-Type을 "multipart/form-data"로 설정해주세요');
    }

    // req (request) 에서 데이터 가져오기

    const { userId, password, name, nickname, phone, address, addressDetail, profileImage } =
      req.body;

    const newUser = await userAuthService.addUser({
      userId,
      password,
      name,
      nickname,
      phone,
      address,
      addressDetail,
      profileImg: req.file ? req.file.filename : '',
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

userAuthRouter.get('/users', loginRequired, async (req, res, next) => {
  try {
    const users = await userAuthService.getUsers();
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
});

// userAuthRouter.get('/user/current', loginRequired, async (req, res, next) => {
//   try {
//     // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
//     const loginedId = req.currentUserId;
//     const currentUserInfo = await userAuthService.getUserInfo({
//       loginedId,
//     });

//     if (currentUserInfo.errorMessage) {
//       throw new Error(currentUserInfo.errorMessage);
//     }

//     res.status(200).send(currentUserInfo);
//   } catch (error) {
//     next(error);
//   }
// });

userAuthRouter.put('/users/:id', loginRequired, async (req, res, next) => {
  try {
    const loginedId = req.params.id;
    const userId = req.body.userId ?? null;
    const password = req.body.password ?? null;
    const name = req.body.name ?? null;
    const nickname = req.body.nickname ?? null;
    const phone = req.body.phone ?? null;
    const address = req.body.address ?? null;
    const addressDetail = req.body.addressDetail ?? null;
    const profileImage = req.body.profileImage ?? null;

    const toUpdate = {
      userId,
      password,
      name,
      nickname,
      phone,
      address,
      addressDetail,
      profileImage,
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

userAuthRouter.get('/users/:id', loginRequired, async (req, res, next) => {
  try {
    const loginedId = req.params.id;
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
