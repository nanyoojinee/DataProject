import { Router } from 'express';
import { groupService } from '../services/groupService.js';
import { upload } from '../middlewares/imageUploadMiddleware.js';
import { loginRequired } from '../middlewares/loginRequired.js';

const groupRouter = Router();

const imgupload = upload.single('thumbnail');

groupRouter.post('/groups/:groupId/join', loginRequired, async (req, res, next) => {
  try {
    const groupId = req.params.groupId;
    const userId = req.currentUserId;
    const state = '대기';

    const group = await groupService.getUserGroup({ userId });

    if (group) {
      res.status(401).json({ message: '가입한 그룹이 존재합니다.' });
      return;
    }

    const result = await groupService.groupJoin({ groupId, userId, state });

    res.json({ result, message: '등록 성공' });
    return;
  } catch (err) {
    next(err);
  }
});

/** 유저의 그룹 생성 추가 ( 그룹장이 되는 유저 ) */
groupRouter.post('/groups', loginRequired, imgupload, async (req, res, next) => {
  try {
    const groupOwner = req.currentUserId;
    const { title, totalNumOfMembers, description } = req.body;
    const thumbnail = req.file ? req.file.filename : null;

    const newGroup = await groupService.addGroup({
      groupOwner,
      title,
      totalNumOfMembers,
      description,
      thumbnail,
    });

    if (newGroup.errorMessage) {
      throw new Error(newGroup.errorMessage);
    }
    res.status(201).json({ newGroup });
    return;
  } catch (error) {
    next(error);
  }
});

//그룹 목록 조회
groupRouter.get('/groups', async (req, res) => {
  const result = await groupService.getGroups();
  console.log(result); // object

  res.status(200).json({ result });
  return;
});

//그룹 상세 조회
groupRouter.get('/groups/:groupId', async (req, res) => {
  const groupId = req.params.groupId;

  const myGroup = await groupService.getMyGroup(groupId);
  console.log('그룹상세조회', myGroup);
  res.status(200).json({ myGroup });
  return;
});

//그룹

//그룹 삭제
groupRouter.delete('/groups/:groupId', async (req, res) => {
  const groupId = req.params.id;
  const result = await groupService.deleteGroup({ groupId });
  console.log('1', result);
  res.status(200).send(result);
  return;
});

export { groupRouter };
