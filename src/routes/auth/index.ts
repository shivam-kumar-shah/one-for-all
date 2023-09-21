import { Router } from "express";
import { join, signIn } from "../../controllers/auth";

const router = Router();

router.post("/join", join);
router.post("/signin", signIn);

export default router;
