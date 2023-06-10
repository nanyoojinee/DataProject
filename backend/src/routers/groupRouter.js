import { Router } from 'express';
import { groupService } from '../services/groupService.js';
import { upload } from '../middlewares/imageUploadMiddleware.js';
import { loginRequired } from '../middlewares/loginRequired.js';

const groupRouter = Router();

const imgupload = upload.single('thumbnail');

//그룹 생성  ( 그룹장이 되는 유저 ) -완
groupRouter.post('/groups', loginRequired, imgupload, async (req, res, next) => {
  try {
    //const groupOwnerId = req.currentUserId;
    const { groupOwnerId, title, totalNumOfMembers, description } = req.body;
    const thumbnail = req.file ? req.file.filename : null;

    const newGroup = await groupService.addGroup({
      groupOwnerId,
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

//그룹 목록 조회 - 완
groupRouter.get('/groups', async (req, res) => {
  const result = await groupService.getGroups();
  res.status(200).json({ result });
  return;
});

//그룹 상세 조회 - 완
groupRouter.get('/groups/:groupId', async (req, res) => {
  const groupId = req.params.groupId;
  const myGroup = await groupService.getMyGroup(groupId);
  console.log('그룹상세조회', myGroup);
  res.status(200).json({ myGroup });
  return;
});

//그룹 가입 대기자 조회
// groupRouter.get('/groups/:groupId/waiting', async (req, res) => {
//   const groupId = req.params.groupId;
//   console.log('gorupId', groupId);
//   const waitingList = await groupService.getWaiting(groupId);
//   console.log('그룹가입 대기자조회', waitingList);
//   res.status(200).json({ waitingList });
//   return;
// });

// 그룹 가입 승인 patch
groupRouter.patch('/groups/:groupId/accept', async (req, res) => {
  const groupId = req.params.groupId;
  const result = await groupService.setJoinedGroup({ loginedId });
  console.log('result:', result);
  res.status(200).json({ result, message: '가입승인' });
  return;
});

//그룹 삭제 -완
groupRouter.delete('/groups/:groupId', async (req, res) => {
  const groupId = req.params.groupId;
  console.log(req.params);
  const result = await groupService.deleteGroup({ groupId });
  console.log('1', result);
  res.status(200).send(result);
  return;
});

export { groupRouter };
