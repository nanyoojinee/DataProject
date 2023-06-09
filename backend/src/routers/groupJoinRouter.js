import { Router } from 'express';
import { groupJoinService } from '../services/groupJoinService.js';
import { upload } from '../middlewares/imageUploadMiddleware.js';
import { loginRequired } from '../middlewares/loginRequired.js';

const groupJoinRouter = Router();

const imgupload = upload.single('image');

//유저의 그룹 가입
groupJoinRouter.post('/mygroups/:groupId', loginRequired, async (req, res, next) => {
  try {
    const groupId = req.params.groupId;
    const loginedId = req.currentUserId;
    const state = '대기';

    const group = await groupJoinService.getUserGroup({ loginedId });
    //다른 그룹 종복 가입 방지 
    if (group) {
      res.status(401).json({ message: '가입한 그룹이 존재합니다.' });
      return;
    }

    const result = await groupJoinService.groupJoin({ groupId, loginedId, state });

    res.json({ result, message: '등록 성공' });
    return;
  } catch (err) {
    next(err);
  }
});


groupJoinRouter.get('/mygroups', async (req, res) => {
  const result = await groupJoinService.getGroups();
  res.status(200).json({ result });
  return;
});

groupJoinRouter.delete('/mygroups/:loginedId', async (req, res) => {
  const loginedId = req.currentUserId;
  console.log(loginedId);
  const result = await groupJoinService.deleteJoinedGroup({ loginedId });
  console.log('1', result);
  res.status(200).send(result);
  return;
})

export { groupJoinRouter };
