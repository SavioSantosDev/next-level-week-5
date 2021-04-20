import { Router } from 'express';
import { SettingController } from '../controllers/setting.controller';

const router = Router();
const settingController = new SettingController();

router.post('/', settingController.store);

export default router;
