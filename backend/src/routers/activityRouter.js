import { Router } from 'express';
import { activityService } from '../services/activityService.js';
import { upload } from '../middlewares/imageUploadMiddleware.js';
import { loginRequired } from '../middlewares/loginRequired.js';

const activityRouter = Router();
const imgupload = upload.single('image');

/** 내 활동 등록 */
activityRouter.post('/activities', imgupload, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const { groupId, state, name, usedDate, category, proofImg } = req.body;

    const newActivity = await activityService.addActivity({
      userId,
      groupId,
      state,
      name,
      usedDate,
      category,
      proofImg,
    });

    if (newActivity && newActivity.errorMessage) {
      throw new Error(newActivity.errorMessage);
    }
    res.status(201).json({ newActivity });
    return;
  } catch (error) {
    next(error);
  }
});

/** 내 그룹 활동 조회 */
activityRouter.get('/activities/:groupId', async (req, res) => {
  const result = await activityService.getActivity(req.params.groupId);

  res.status(200).json({ result });
});

/** 활동 승인 대기 조회 */
activityRouter.get('/activities/:groupId/waiting', loginRequired, async (req, res) => {
  const result = await activityService.getWaitingActivity(req.params.groupId);

  res.status(200).json({ result });
});

/** 활동 인증 사진 조회 */
activityRouter.get('/activities/:groupId/ProofImg', loginRequired, async (req, res) => {
  const result = await activityService.getActivityProofImages(req.params.groupId);

  res.status(200).json({ result });
});

/** 활동 신청 승인 수락 */
activityRouter.patch('/activities/:groupId/accept', async (req, res) => {
  const result = await activityService.acceptActivityRequest(req.params.groupId);

  res.status(200).json({ result });
});

/** 활동 신청 승인 거절 */
activityRouter.delete('/activities/:groupId/reject', async (req, res) => {
  const result = await activityService.rejectActivityRequest(req.params.groupId);

  res.status(200).json({ result });
});

/** 활동 리스트 조회 */
activityRouter.get('/activities/:loginedId', loginRequired, async (req, res) => {
  const result = await activityService.getActivities(req.params.loginedId);

  res.status(200).json({ result });
});

export { activityRouter };
