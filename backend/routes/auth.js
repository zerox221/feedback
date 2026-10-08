const express = require('express');
const { registerController, verifyController, logOutController, loginController, getMeController, refreshAccessTokenController } = require('../controllers/auth.controllers');
const { authMiddleware } = require('../middlewares/auth.middleware');
const authRouter = express.Router();

authRouter.post("/register",registerController);
authRouter.post("/verify",verifyController);
authRouter.post("/login",loginController);
authRouter.get("/get-me",authMiddleware,getMeController);
authRouter.get("/refresh-token",refreshAccessTokenController);
authRouter.get("/logout",authMiddleware,logOutController);
module.exports = authRouter;
