const express = require('express');
const { shareFeedbackController, genrateFeedbackController, isUserNameAvailableController, summeriseFeedbacksController, changeIsAcceptingFeedback, deleteFeedback, getAllFeedbacks } = require('../controllers/user.controllers');
const { authMiddleware } = require('../middlewares/auth.middleware');

const userRouter = express.Router();

userRouter.post("/share/feedback",shareFeedbackController);
userRouter.get("/genrate/feedbacks",genrateFeedbackController)
userRouter.get("/summerise/feedbacks",authMiddleware,summeriseFeedbacksController);
userRouter.post("/check-username",isUserNameAvailableController);
userRouter.post("/change/switch",authMiddleware,changeIsAcceptingFeedback);
userRouter.delete("/delete/feedback/:id",authMiddleware,deleteFeedback);
userRouter.get("/all/feedbacks",authMiddleware,getAllFeedbacks);
module.exports = userRouter;