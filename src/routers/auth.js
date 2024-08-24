import { Router } from "express";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import { loginUserController, logoutUserController, refreshUserController, registerController } from "../controllers/auth.js";
import { validateBody } from "../middlewares/validateBody.js";
import { userLoginSchema, userValidationSchema } from "../validation/auth.js";

const router = Router();

router.post('/register', validateBody(userValidationSchema), ctrlWrapper(registerController));
router.post('/login', validateBody(userLoginSchema), ctrlWrapper(loginUserController));
router.post('/refresh', ctrlWrapper(refreshUserController));
router.post('/logout', ctrlWrapper(logoutUserController));

export default router;