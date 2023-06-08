import { Router } from 'express';
import { groupJoinService } from '../services/groupJoinService.js';
import { upload } from '../middlewares/imageUploadMiddleware.js';
import { loginRequired } from '../middlewares/loginRequired.js';

const groupJoinRouter = Router();

const imgupload = upload.single('image');

/** 유저의 그룹 가입 */
groupJoinRouter.post('/groups/:', loginRequired, async (req, res, next) => {
  try {
    const loginedId = req.currentUserId;
    const { groupId, state } = req.body;

    const newGroupJoin = await groupJoinService.addGroupJoin({
      groupId,
      loginedId,
      state,
    });

    if (newGroupJoin.errorMessage) {
      throw new Error(newGroupJoin.errorMessage);
    }
    res.status(201).json({ newGroupJoin });
    return;
  } catch (error) {
    next(error);
  }
});

groupJoinRouter.get('/group', async (req, res) => {
  const result = await groupService.getGroups();
  res.status(200).json({ result });
  return;
});

export { groupJoinRouter };
